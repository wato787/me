import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface SlideViewerProps {
  slides: string[];
  title: string;
}

function getIndexFromHash(length: number): number {
  if (typeof window === 'undefined') return 0;

  const rawHash = window.location.hash.replace(/^#/, '');
  const normalizedHash = rawHash.replace(/^slide-/, '');
  const parsed = Number.parseInt(normalizedHash, 10);

  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), Math.max(length - 1, 0));
}

export default function SlideViewer({ slides, title }: SlideViewerProps) {
  const lastIndex = Math.max(slides.length - 1, 0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = useMemo(() => slides[currentIndex] ?? '', [currentIndex, slides]);

  const goTo = useCallback(
    (nextIndex: number, replace = false) => {
      const clampedIndex = Math.min(Math.max(nextIndex, 0), lastIndex);
      setCurrentIndex(clampedIndex);

      if (typeof window === 'undefined') return;

      const nextHash = `#${clampedIndex + 1}`;
      if (window.location.hash === nextHash) return;

      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      if (replace) {
        window.history.replaceState(null, '', nextUrl);
        return;
      }

      window.history.pushState(null, '', nextUrl);
    },
    [lastIndex],
  );

  const goPrevious = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  useEffect(() => {
    if (slides.length === 0) return;

    goTo(getIndexFromHash(slides.length), true);

    const syncIndexFromUrl = () => {
      setCurrentIndex(getIndexFromHash(slides.length));
    };

    window.addEventListener('hashchange', syncIndexFromUrl);
    window.addEventListener('popstate', syncIndexFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncIndexFromUrl);
      window.removeEventListener('popstate', syncIndexFromUrl);
    };
  }, [goTo, slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrevious();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrevious]);

  if (slides.length === 0) {
    return (
      <div className="slideViewer" aria-label={`${title} のスライド`}>
        <p className="empty">スライド本文がまだありません。</p>
      </div>
    );
  }

  return (
    <section className="slideViewer" aria-label={`${title} のスライド`}>
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
      </div>
    </section>
  );
}
