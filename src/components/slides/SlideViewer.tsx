import DOMPurify from 'dompurify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SlideDeck } from './types';

interface SlideViewerProps {
  deck: SlideDeck;
  onClose: () => void;
  onReady: (overlay: HTMLElement) => void;
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

  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
};

const sanitizeSlideHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'],
  });
};

const SlideViewer = ({ deck, onClose, onReady }: SlideViewerProps) => {
  const overlayRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromHash(deck.slides.length));
  const lastIndex = Math.max(deck.slides.length - 1, 0);
  const currentSlide = useMemo(() => sanitizeSlideHtml(deck.slides[currentIndex] ?? ''), [currentIndex, deck.slides]);

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

  const close = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    onClose();
  }, [onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      void close();
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
      return;
    }
    if (event.key === 'ArrowRight' || event.key === ' ') {
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

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.focus();
    onReady(overlay);
  }, [onReady]);

  useEffect(() => {
    updateHash(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onClose]);

  if (deck.slides.length === 0) {
    return (
      <section className="slideOverlay" aria-label={`${deck.title} のスライド`}>
        <p className="empty">スライド本文がまだありません。</p>
      </section>
    );
  }

  return (
    <section
      ref={overlayRef}
      className="slideOverlay"
      aria-label={`${deck.title} のスライド`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button type="button" className="overlayBackdrop" aria-label="スライドを閉じる" onClick={() => void close()} />
      <div className="slideStage">
        <article
          className="articleBody slideBody"
          aria-label={`${currentIndex + 1}枚目のスライド`}
          dangerouslySetInnerHTML={{ __html: currentSlide }}
        />
      </div>
      <div className="slideProgress mono-font" aria-live="polite">
        {currentIndex + 1} / {deck.slides.length}
      </div>
    </section>
  );
};

export default SlideViewer;
