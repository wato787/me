import { useEffect, useRef, useState } from 'react';
import type { SlideDeck } from './types';

interface SlideViewerProps { deck: SlideDeck; closeHref: string; readHref: string; }

const getIndexFromHash = (length: number) => {
  const parsed = Number.parseInt(window.location.hash.replace(/^#(?:slide-)?/, ''), 10);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed - 1, 0), Math.max(length - 1, 0)) : 0;
};

const SlideViewer = ({ deck, closeHref, readHref }: SlideViewerProps) => {
  const viewerRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(true);
  const lastIndex = Math.max(deck.slides.length - 1, 0);

  const goTo = (nextIndex: number) => {
    const index = Math.min(Math.max(nextIndex, 0), lastIndex);
    setCurrentIndex(index);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${index + 1}`);
  };

  const close = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    window.location.assign(closeHref);
  };

  const toggleFullscreen = async () => {
    const viewer = viewerRef.current;
    if (!viewer || !document.fullscreenEnabled) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await viewer.requestFullscreen();
    } catch {
      setCanFullscreen(false);
    }
  };

  useEffect(() => {
    const syncHash = () => setCurrentIndex(getIndexFromHash(deck.slides.length));
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
    setCanFullscreen(document.fullscreenEnabled);
    viewerRef.current?.focus();
    syncHash();
    window.addEventListener('hashchange', syncHash);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      document.removeEventListener('fullscreenchange', syncFullscreen);
    };
  }, [deck.slides.length]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Escape') {
      if (document.fullscreenElement) return;
      event.preventDefault();
      void close();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault(); goTo(currentIndex - 1);
    } else if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault(); goTo(currentIndex + 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => { touchStartXRef.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX === null || endX === undefined || Math.abs(endX - startX) < 48) return;
    goTo(currentIndex + (endX > startX ? -1 : 1));
  };

  return (
    <main ref={viewerRef} className="slideViewer" aria-label={`${deck.title} のスライド`} tabIndex={-1} onKeyDown={handleKeyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <header className="viewerHeader">
        <a className="viewerLink mono-font" href={closeHref}>Back</a>
        <p className="viewerTitle">{deck.title}</p>
        <nav className="viewerActions mono-font" aria-label="資料表示">
          <a className="viewerLink" href={readHref}>Read</a>
          <button type="button" className="viewerLink" onClick={() => void toggleFullscreen()} disabled={!canFullscreen}>{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}</button>
        </nav>
      </header>
      <div className="slideViewport">
        {deck.slides.length > 0 ? <article className="articleBody slideBody" aria-label={`${currentIndex + 1}枚目のスライド`} dangerouslySetInnerHTML={{ __html: deck.slides[currentIndex] ?? '' }} /> : <p className="empty">スライド本文がまだありません。</p>}
      </div>
      <footer className="viewerFooter mono-font">
        <button type="button" className="slideNav" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>Previous</button>
        <span className="slideProgress" aria-live="polite">{currentIndex + 1} / {deck.slides.length}</span>
        <button type="button" className="slideNav" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === lastIndex}>Next</button>
      </footer>
    </main>
  );
};

export default SlideViewer;
