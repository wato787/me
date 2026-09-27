import type { SlideCardDeck } from './types';

interface SlidesGalleryProps {
  decks: SlideCardDeck[];
}

const SlidesGallery = ({ decks }: SlidesGalleryProps) => {
  return (
    <div className="slidesGrid">
      {decks.map((deck, index) => (
        <a
          className="slideCard"
          style={{ '--card-index': index % 6 } as React.CSSProperties}
          href={`/slides/${deck.id}`}
          key={deck.id}
        >
          <span className="cardMeta mono-font">{deck.date}</span>
          <span className="cardTitle">{deck.title}</span>
          <span className="cardHint mono-font">Open</span>
        </a>
      ))}
    </div>
  );
};

export default SlidesGallery;
