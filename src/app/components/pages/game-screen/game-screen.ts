import { Component, OnInit, signal, computed, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-screen',
  imports: [],
  templateUrl: './game-screen.html',
  styleUrl: './game-screen.scss'
})
export class GameScreen {
  @Input() readonly difficulty!: string;
  @Output() readonly backToMain = new EventEmitter<void>();

  cards = signal<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([])
  flippedCards = signal<number[]>([]);
  matchedPairs = signal(0);
  isChecking = signal(false);

  private readonly allEmojis = [
    '👻', '🎃', '🕷️', '🦇', '💀', '🧛',
    '🧟', '🧙', '🔮', '🕸️', '🌕', '⚰️'
  ];

  ngOnInit(): void {
    this.setupGame();
  }

  setupGame(): void {
    let cardPairs: number;
    let gridStyle: string;

    // Determine the number of pairs and grid style based on difficulty
    if (this.difficulty === "Easy") {
      cardPairs = 6;
      gridStyle = "repeat(4, 1fr)";
    } else if (this.difficulty === "Medium") {
      cardPairs = 8;
      gridStyle = "repeat(4, 1fr)";
    } else {
      cardPairs = 12;
      gridStyle = "repeat(6, 1fr)";
    }

    const selectedEmojis = this.allEmojis.slice(0, cardPairs);
    const gameValues = [...selectedEmojis, ...selectedEmojis];
    this.shuffleArray(gameValues);

    const initialCards = gameValues.map((value, index) => ({
      id: index,
      value: value,
      flipped: false,
      matched: false
    }));

    this.cards.set(initialCards);
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  flipCard(cardId: number): void {
    if (this.isChecking() || this.flippedCards().includes(cardId) || this.cards()[cardId].matched) {
      return;
    }

    this.cards.update(cards => {
      const card = cards.find(c => c.id === cardId);
      if (card) {
        card.flipped = true
      }
      return cards;
    });

    this.flippedCards.update(ids => [...ids, cardId]);

    if (this.flippedCards().length === 2) {
      this.isChecking.set(true);
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  checkMatch(): void {
    const [id1, id2] = this.flippedCards();
    const card1 = this.cards().find(c => c.id === id1)!;
    const card2 = this.cards().find(c => c.id === id2)!;

    if (card1.value === card2.value) {
      this.cards.update(cards => {
        cards.find(c => c.id === id1)!.matched = true;
        cards.find(c => c.id === id2)!.matched = true;
        return cards;
      });
      this.matchedPairs.update(count => count + 1);
    } else {
      this.cards.update(cards => {
        cards.find(c => c.id === id1)!.flipped = false;
        cards.find(c => c.id === id2)!.flipped = false;
        return cards;
      });
    }

    this.flippedCards.set([]);
    this.isChecking.set(false);
  }

  getGridStyle(): string {
    if (this.difficulty === "Easy") {
      return "grid-template-columns: repeat(4, 1fr);";
    } else if (this.difficulty === "Medium") {
      return "grid-template-columns: repeat(4, 1fr);";
    } else {
      return 'grid-template-columns: repeat(6, 1fr);';
    }
  }

  backToMainScreen(): void {
    this.backToMain.emit();
  }
}
