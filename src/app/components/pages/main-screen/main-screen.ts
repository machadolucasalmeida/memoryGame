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

  selectCard(difficulty: string) : void {
    this.selectedCard.set(difficulty);
    console.log("Selected Difficulty: ", this.selectedCard());
  }

  
}
