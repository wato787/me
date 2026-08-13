import { useMemo, useState } from 'react';
import SlideViewer from './SlideViewer';
import { loadSlideDeck } from './loadSlideDeck';
import type { SlideCardDeck, SlideDeck } from './types';

interface SlidesGalleryProps {
  decks: SlideCardDeck[];
}

const handleViewerReady = (overlay: HTMLElement) => {
  overlay.focus();
  if (!document.fullscreenEnabled || document.fullscreenElement) return;
  void overlay.requestFullscreen().catch(() => undefined);
};

const SlidesGallery = ({ decks }: SlidesGalleryProps) => {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [loadedDecks, setLoadedDecks] = useState<Record<string, SlideDeck>>({});
  const [loadingDeckId, setLoadingDeckId] = useState<string | null>(null);
  const [errorDeckId, setErrorDeckId] = useState<string | null>(null);
  const activeDeck = activeDeckId ? loadedDecks[activeDeckId] : null;

  const deckById = useMemo(() => {
    return Object.fromEntries(decks.map((deck) => [deck.id, deck]));
  }, [decks]);

  const openDeck = async (deckId: string) => {
    const cachedDeck = loadedDecks[deckId];
    if (cachedDeck) {
      setActiveDeckId(deckId);
      return;
    }

    const deckMeta = deckById[deckId];
    if (!deckMeta) return;

    setLoadingDeckId(deckId);
    setErrorDeckId(null);

    try {
      const nextDeck = await loadSlideDeck(deckMeta);
      setLoadedDecks((current) => ({ ...current, [deckId]: nextDeck }));
      setActiveDeckId(deckId);
    } catch {
      setErrorDeckId(deckId);
    } finally {
      setLoadingDeckId(null);
    }
  };

  return (
    <>
      {decks.length > 0 ? (
        <div className="slidesGrid">
          {decks.map((deck, index) => {
            const isLoading = loadingDeckId === deck.id;
            const hasError = errorDeckId === deck.id;

            return (
              <button
                type="button"
                className="slideCard"
                style={{ '--card-index': index % 6 } as React.CSSProperties}
                onClick={() => void openDeck(deck.id)}
                disabled={isLoading}
                key={deck.id}
              >
                <span className="cardMeta mono-font">{deck.date}</span>
                <span className="cardTitle">{deck.title}</span>
                <span className="cardHint mono-font">{hasError ? 'Retry' : isLoading ? 'Loading' : 'Open'}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="empty">スライドはまだありません。</p>
      )}

      {activeDeck && <SlideViewer deck={activeDeck} onClose={() => setActiveDeckId(null)} onReady={handleViewerReady} />}
    </>
  );
};

export default SlidesGallery;
