import { useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import SlideViewer, { type SlideDeck } from './SlideViewer';

export interface SlideCardDeck {
  id: string;
  title: string;
  date: string;
}

interface SlidesGalleryProps {
  decks: SlideCardDeck[];
}

interface SlideDeckResponse {
  id: string;
  title: string;
  slides: string[];
}

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
      flushSync(() => {
        setActiveDeckId(deckId);
      });
      return;
    }

    setLoadingDeckId(deckId);
    setErrorDeckId(null);

    try {
      const response = await fetch(`/slides/data/${deckId}.json`);
      if (!response.ok) throw new Error(`Failed to load slide deck: ${response.status}`);

      const data = (await response.json()) as SlideDeckResponse;
      const deckMeta = deckById[deckId];
      const nextDeck = {
        id: data.id,
        title: data.title,
        date: deckMeta?.date ?? '',
        slides: data.slides,
      };

      flushSync(() => {
        setLoadedDecks((current) => ({ ...current, [deckId]: nextDeck }));
        setActiveDeckId(deckId);
      });
    } catch {
      setErrorDeckId(deckId);
    } finally {
      setLoadingDeckId(null);
    }
  };

  const handleViewerReady = (overlay: HTMLElement) => {
    overlay.focus();
    if (!document.fullscreenEnabled || document.fullscreenElement) return;
    void overlay.requestFullscreen().catch(() => undefined);
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
