import { Component, OnInit, signal, computed } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";
interface Option {
  id: number;
  name: string;
  alias: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.css'],
    standalone: true,
    imports: [] // NgIf e NgFor removidos, pois usamos @if e @for no HTML
})
export class QuizzComponent implements OnInit {
  title = signal<string>("");

  // Signals para gerenciar o estado de forma reativa
  questions = signal<Question[]>([]);
  questionIndex = signal<number>(0);
  finished = signal<boolean>(false);
  answers = signal<string[]>([]);
  answerSelected = signal<string>("");

  // Computed: Um signal derivado que se atualiza sozinho
  questionMaxIndex = computed(() => this.questions().length);
  questionSelected = computed(() => this.questions()[this.questionIndex()]);

  ngOnInit(): void {
    if (quizz_questions) {
      this.title.set(quizz_questions.title);
      this.questions.set(quizz_questions.questions as Question[]);
      this.finished.set(false);
    }
  }

  playerChoose(value: string): void {
    this.answers.update(current => [...current, value]);
    this.nextStep();
  }

  private nextStep(): void {
    const nextIndex = this.questionIndex() + 1;

    if (nextIndex < this.questionMaxIndex()) {
      this.questionIndex.set(nextIndex);
    } else {
      this.finishQuizz();
    }
  }

  private finishQuizz(): void {
    const finalAlias = this.calculateResult(this.answers());
    this.finished.set(true);

    const results = quizz_questions.results as Record<string, string>;
    this.answerSelected.set(results[finalAlias] || "Resultado não encontrado");
  }

  private calculateResult(answers: string[]): string {
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  restartQuizz(): void {
    this.questionIndex.set(0);
    this.answers.set([]);
    this.finished.set(false);
  }
}
