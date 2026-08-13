import type { SlideCardDeck, SlideDeck, SlideDeckResponse } from './types';

export const loadSlideDeck = async (deckMeta: SlideCardDeck): Promise<SlideDeck> => {
  const response = await fetch(`/slides/data/${deckMeta.id}.json`);
  if (!response.ok) throw new Error(`Failed to load slide deck: ${response.status}`);

  const data = (await response.json()) as SlideDeckResponse;
  return {
    id: data.id,
    title: data.title,
    date: deckMeta.date,
    slides: data.slides,
  };
};
