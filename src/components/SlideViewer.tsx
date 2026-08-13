import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useEffectEvent, useSyncExternalStore } from 'react';

interface SlideViewerProps {
  slides: string[];
  title: string;
}

const HASH_STORE_CHANGE_EVENT = 'slide-viewer:hash-change';

function getIndexFromHashValue(hash: string, length: number): number {
  const rawHash = hash.replace(/^#/, '');
  const normalizedHash = rawHash.replace(/^slide-/, '');
  const parsed = Number.parseInt(normalizedHash, 10);

  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), Math.max(length - 1, 0));
}

function getIndexFromHash(length: number): number {
  return getIndexFromHashValue(getHashSnapshot(), length);
}

function getHashSnapshot(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash;
}

function getServerHashSnapshot(): string {
  return '';
}

function subscribeToHashChange(onStoreChange: () => void): () => void {
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener(HASH_STORE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener(HASH_STORE_CHANGE_EVENT, onStoreChange);
  };
}

function notifyHashStoreChange(): void {
  window.dispatchEvent(new Event(HASH_STORE_CHANGE_EVENT));
}

export default function SlideViewer({ slides, title }: SlideViewerProps) {
  const lastIndex = Math.max(slides.length - 1, 0);
  const hash = useSyncExternalStore(subscribeToHashChange, getHashSnapshot, getServerHashSnapshot);
  const currentIndex = getIndexFromHashValue(hash, slides.length);

  const currentSlide = slides[currentIndex] ?? '';

  const goTo = useCallback(
    (nextIndex: number, replace = false) => {
      const clampedIndex = Math.min(Math.max(nextIndex, 0), lastIndex);

      if (typeof window === 'undefined') return;

      const nextHash = `#${clampedIndex + 1}`;
      if (window.location.hash === nextHash) return;

      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      if (replace) {
        window.history.replaceState(null, '', nextUrl);
        notifyHashStoreChange();
        return;
      }

      window.history.pushState(null, '', nextUrl);
      notifyHashStoreChange();
    },
    [lastIndex],
  );

  const goPrevious = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const handleGlobalKeyDown = useEffectEvent((event: KeyboardEvent) => {
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
  });

  useEffect(() => {
    if (slides.length === 0) return;

    goTo(getIndexFromHash(slides.length), true);
  }, [goTo, hash, slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleGlobalKeyDown(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
