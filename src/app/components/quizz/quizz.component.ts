import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import necessário
import * as quizzData from "../../../assets/data/quizz_questions.json";
import * as quizzIAData from "../../../assets/data/quizz_ia.json";
import { Option, Question } from './quizz.types';

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.css'],
    standalone: true,
    imports: []
})
export class QuizzComponent implements OnInit {
  private route = inject(ActivatedRoute); // Injetando a rota

  title = signal<string>("");
  questions = signal<Question[]>([]);
  questionIndex = signal<number>(0);
  finished = signal<boolean>(false);
  answers = signal<string[]>([]);
  answerSelected = signal<string>("");

  // Referência para o JSON atual (para usar no finishQuizz)
  private currentJsonData: any;

  questionMaxIndex = computed(() => this.questions().length);

  questionSelected = computed(() => {
    const currentQuestions = this.questions();
    const index = this.questionIndex();
    if (currentQuestions.length > 0 && currentQuestions[index]) {
      return currentQuestions[index];
    }
    return { question: '', options: [] } as unknown as Question;
  });

  ngOnInit(): void {
    // 1. Captura o parâmetro da rota (ex: 'ia' ou 'heroes')
    const type = this.route.snapshot.paramMap.get('type');

    // 2. Define qual JSON carregar e muda o "cenário" (tema)
    if (type === 'ia') {
      this.currentJsonData = (quizzIAData as any).default || quizzIAData;
      this.applyTheme('ia-theme');
    } else {
      this.currentJsonData = (quizzData as any).default || quizzData;
      this.applyTheme('heroes-theme');
    }

    // 3. Popula os signals
    if (this.currentJsonData && this.currentJsonData.questions) {
      this.title.set(this.currentJsonData.title);
      this.questions.set(this.currentJsonData.questions as Question[]);
    }
  }

  // Função para mudar o cenário (CSS)
  private applyTheme(themeName: string): void {
    document.body.classList.remove('ia-theme', 'heroes-theme');
    document.body.classList.add(themeName);
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

    const results = this.currentJsonData.results as Record<string, string>;
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
