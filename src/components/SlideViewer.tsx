import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

interface SlideViewerProps {
  slides: string[];
  title: string;
}

const getIndexFromHash = (length: number): number => {
  if (typeof window === 'undefined') return 0;

  const rawHash = window.location.hash.replace(/^#/, '');
  const normalizedHash = rawHash.replace(/^slide-/, '');
  const parsed = Number.parseInt(normalizedHash, 10);

  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), Math.max(length - 1, 0));
};

const updateHash = (index: number): void => {
  if (typeof window === 'undefined') return;

  const nextHash = `#${index + 1}`;
  if (window.location.hash === nextHash) return;

  window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
};

const SlideViewer = ({ slides, title }: SlideViewerProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromHash(slides.length));
  const lastIndex = Math.max(slides.length - 1, 0);
  const currentSlide = slides[currentIndex] ?? '';

  const goTo = useCallback(
    (nextIndex: number) => {
      const clampedIndex = Math.min(Math.max(nextIndex, 0), lastIndex);
      setCurrentIndex(clampedIndex);
      updateHash(clampedIndex);
    },
    [lastIndex],
  );

  const goPrevious = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX === null) return;

    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;

    const distance = endX - startX;
    if (Math.abs(distance) < 48) return;
    if (distance > 0) {
      goPrevious();
      return;
    }
    goNext();
  };

  const handleFullscreen = async () => {
    const element = rootRef.current;
    if (!element || !document.fullscreenEnabled) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await element.requestFullscreen();
    element.focus();
  };

  if (slides.length === 0) {
    return (
      <section className="slideViewer" aria-label={`${title} のスライド`}>
        <p className="empty">スライド本文がまだありません。</p>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="slideViewer"
      aria-label={`${title} のスライド`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => rootRef.current?.focus()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="viewerTop">
        <a href="/slides" className="backLink mono-font">
          Slides
        </a>
        <h1 className="deckTitle">{title}</h1>
      </div>

      <div className="slideStage">
        <article
          className="articleBody slideBody"
          aria-label={`${currentIndex + 1}枚目のスライド`}
          dangerouslySetInnerHTML={{ __html: currentSlide }}
        />
      </div>

      <div className="slideControls">
        <button
          type="button"
          className="controlButton"
          onClick={goPrevious}
          disabled={currentIndex === 0}
          aria-label="前のスライド"
          title="前のスライド"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        <span className="slideCounter mono-font" aria-live="polite">
          {currentIndex + 1} / {slides.length}
        </span>

        <button
          type="button"
          className="controlButton"
          onClick={goNext}
          disabled={currentIndex === lastIndex}
          aria-label="次のスライド"
          title="次のスライド"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="controlButton"
          onClick={handleFullscreen}
          aria-label="全画面表示"
          title="全画面表示"
        >
          <Expand size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default SlideViewer;
