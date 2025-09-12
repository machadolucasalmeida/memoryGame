import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for @if and other directives
import { MainScreen } from './components/pages/main-screen/main-screen';
import { GameScreen } from './components/pages/game-screen/game-screen';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MainScreen, GameScreen, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedDifficulty = signal<string | null>(null);
  gameStarted = signal(false);

  onStartGame(difficulty: string): void{
    this.selectedDifficulty.set(difficulty);
    this.gameStarted.set(true);
    console.log(`Starting game with difficulty: ${this.selectedDifficulty()}`);
  }
  onBackToMain(): void{
    this.gameStarted.set(false);
    console.log("Returning to main screen.");
  }
}
