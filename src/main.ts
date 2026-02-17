// main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { QuizzComponent } from './app/components/quizz/quizz.component'; // Importe o QuizzComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  // Nova rota para o quiz, recebendo o tipo como parâmetro
  { path: 'quiz/:type', component: QuizzComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
    // Se quiser o Zoneless: provideExperimentalZonelessChangeDetection()
  ]
}).catch(err => console.error(err));
