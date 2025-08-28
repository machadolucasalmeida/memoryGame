import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { MainScreen } from "./components/pages/main-screen/main-screen";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MainScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('memoryGame');
}
