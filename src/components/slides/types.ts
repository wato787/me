export interface SlideCardDeck {
  id: string;
  title: string;
  date: string;
}

export interface SlideDeck extends SlideCardDeck {
  slides: string[];
}
