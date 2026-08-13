import { useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import SlideViewer, { type SlideDeck } from './SlideViewer';

interface SlidesGalleryProps {
  decks: SlideDeck[];
}

const SlidesGallery = ({ decks }: SlidesGalleryProps) => {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const activeDeck = useMemo(() => decks.find((deck) => deck.id === activeDeckId) ?? null, [activeDeckId, decks]);

  const openDeck = (deckId: string) => {
    flushSync(() => {
      setActiveDeckId(deckId);
    });
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
          {decks.map((deck, index) => (
            <button
              type="button"
              className="slideCard"
              style={{ '--card-index': index % 6 } as React.CSSProperties}
              onClick={() => openDeck(deck.id)}
              key={deck.id}
            >
              <span className="cardMeta mono-font">{deck.date}</span>
              <span className="cardTitle">{deck.title}</span>
              <span className="cardHint mono-font">{deck.slides.length} slides</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="empty">スライドはまだありません。</p>
      )}

      {activeDeck && <SlideViewer deck={activeDeck} onClose={() => setActiveDeckId(null)} onReady={handleViewerReady} />}
    </>
  );
};

export default SlidesGallery;
