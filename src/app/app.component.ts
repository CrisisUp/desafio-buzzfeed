import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; // Importação essencial

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Adicione aqui!
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
