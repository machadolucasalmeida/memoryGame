import { Component, signal, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  imports: [],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.scss'
})
export class MainScreen {
  selectedDifficulty = signal<string | null>(null);
  @Output() readonly startGame = new EventEmitter<string>();

  selectDifficulty(difficulty: string): void {
    this.selectedDifficulty.set(difficulty);
    console.log("Selected Difficulty: ", this.selectedDifficulty());
  }

  onStart(): void {
    if(this.selectedDifficulty()) {
      this.startGame.emit(this.selectedDifficulty()!);
    }else{
      console.log("No difficulty selected.");
      // You can add a visual cue here to tell the user to select a difficulty
    }
  }
}
