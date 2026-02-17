import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // Importe o RouterLink para os botões funcionarem

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RouterLink] // Substitua QuizzComponent por RouterLink
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Como você é técnico de redes, pode usar o ngOnInit para
    // garantir que o cenário antigo seja limpo ao voltar para a home
    document.body.classList.remove('ia-theme', 'heroes-theme');
  }

}
