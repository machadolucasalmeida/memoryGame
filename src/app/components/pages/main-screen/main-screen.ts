import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  imports: [],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.scss'
})
export class MainScreen {
  selectedCard = signal<string | null>(null);

  difficulty: string = "";
  selectCard(difficulty: string): void {
    this.selectedCard.set(difficulty);
    console.log("Selected Difficulty: ", this.selectedCard());
    this.difficulty = difficulty;
  }

  sendDifficulty() {
    localStorage.setItem("difficulty", this.difficulty);
    console.log("Difficulty successfully passed: ", this.difficulty);
  }
}
