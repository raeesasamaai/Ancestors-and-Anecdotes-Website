import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { PageFlip } from "../vendor/page-flip.js";
import "../vendor/page-flip.css";
import ScrollReveal from "./ScrollReveal";


/* =========================================================
   EXAMPLE DETAILS
========================================================= */

const exampleDetails = [
  {
    id: "family-tree",

    modalTitle: "Family Tree Charts",

    subtitle:
      "Turning names, dates, and relationships into a clear family structure",

    description:
      "A family tree chart helps bring your ancestry into focus by organising family members, relationships, and generations in a visual format.",

    features: [
      "Family members organised across generations",
      "Clear parent, child, and sibling relationships",
      "Visual structure of family branches",
      "Important names, dates, and family connections",
      "A clean layout suitable for sharing or printing",
    ],

    bestFor:
      "This is best for individuals and families who want a clear overview of their family connections and a visual record of their ancestry.",

    cta:
      "I Want to Build My Family Tree",

    media: [
      {
        type: "image",
        src: "/Images/Nissen_family tree-2.png",
        alt: "Visual family tree example",
        fit: "cover",
      },
    ],
  },

  {
    id: "family-history",

    modalTitle: "Family History Document",

    subtitle:
      "Turning research findings into a meaningful written record of your family’s story",

    description:
      "A family history document brings together names, dates, locations, records, photographs, and family memories in a clear, story-led format. It gives the research greater context and creates a lasting record that can be read, printed, and shared with relatives.",

    features: [
      "A structured written account of family history findings",
      "Profiles of important ancestors and family branches",
      "Historical context around significant people, places, and events",
      "Organised timelines, photographs, records, and supporting notes",
      "A polished document suitable for reading, printing, and sharing",
    ],

    bestFor:
      "This is best for families who want their research preserved as a meaningful written keepsake that can be read, printed, and passed down to future generations.",

    cta:
      "I Want to Preserve My Family Story",

    media: [
      {
        type: "book",

        alt:
          "Interactive family history document example",

        pages: [
          "/Images/BookPage01.jpg",
          "/Images/BookPage02.jpg",
          "/Images/BookPage03.jpg",
          "/Images/BookPage04.jpg",
          "/Images/BookPage05.jpg",
          "/Images/BookPage06.jpg",
        ],
      },
    ],
  },

  {
    id: "research-video",

    modalTitle:
      "Oral History & Digital Story",

    subtitle:
      "Sharing your story through an engaging visual story",

    description:
      "Oral history is the audio recording of a person’s personal account of their lives or a historical event. A digital story takes this a step further by creating a short film (5 - 10 minutes) using photographs supplied by the client, narrated using extracts from the recordings.",

    features: [
      "Personal oral history interview",
      "5-10 minute narrated digital story",
      "Client photographs woven into the final film",
    ],

    bestFor:
      "This is best for families who want to experience and share their findings in a more visual, emotional, and accessible format.",

    cta:
      "I Want an Oral history & Digital story",

    media: [
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/AQrIwsLSGZA?si=LB3_3ROcM3DA9gWR",
        alt: "Oral history and digital story video example",
      },
    ],
  },
];


/* =========================================================
   CARD DATA
========================================================= */

const exampleCards = [
  {
    example: exampleDetails[0],

    image:
      "/Images/Nissen_family tree-2.png",

    alt:
      "Visual Family Tree",

    imageClass:
      "sepia-[8%]",

    title: (
      <>
        Family Tree
        <br />
        Charts
      </>
    ),
  },

  {
    example: exampleDetails[1],

    image:
      "/Images/BookPage01.jpg",

    alt:
      "Family History Document",

    imageClass:
      "sepia-[25%]",

    title: (
      <>
        Family History
        <br />
        Document
      </>
    ),
  },

  {
    example: exampleDetails[2],

    youtubeSrc:
      "https://www.youtube.com/embed/AQrIwsLSGZA?si=LB3_3ROcM3DA9gWR",

    alt:
      "Oral history and digital story video example",

    imageClass:
      "sepia-[25%]",

    title: (
      <>
        Oral History &amp;
        <br />
        Digital Story
      </>
    ),
  },
];


/* =========================================================
   LAPTOP / TABLET INTERACTION DETECTION
========================================================= */

/*
 * We first determine whether the current device is
 * genuinely a phone/tablet platform.
 *
 * This is intentionally separate from screen width.
 *
 * An iPad Pro can have a 1024px+ viewport, so width
 * alone must NOT enable desktop hover mode.
 */

function isPhoneOrTabletPlatform() {
  if (
    typeof navigator === "undefined" ||
    typeof window === "undefined"
  ) {
    return false;
  }


  const userAgent =
    navigator.userAgent || "";


  const platform =
    navigator.platform || "";


  const maxTouchPoints =
    navigator.maxTouchPoints || 0;


  /*
   * Traditional iPhone/iPad user agents.
   */

  const isIOS =
    /iPhone|iPad|iPod/i.test(
      userAgent,
    );


  /*
   * Modern iPads can identify themselves as
   * Macintosh / MacIntel.
   */

  const isModernIPad =
    /Macintosh/i.test(userAgent) &&
    maxTouchPoints > 1;


  const isMacIntelIPad =
    platform === "MacIntel" &&
    maxTouchPoints > 1;


  /*
   * Android includes both phones and tablets.
   */

  const isAndroid =
    /Android/i.test(
      userAgent,
    );


  /*
   * Additional mobile user-agent protection.
   */

  const isMobileUA =
    /Mobile|Tablet|Silk|Kindle|PlayBook/i.test(
      userAgent,
    );


  /*
   * Chrome DevTools tablet/device emulation normally
   * exposes coarse pointer + no hover.
   *
   * We only use this as a tablet signal when the
   * environment does NOT clearly identify as Windows.
   *
   * This avoids incorrectly classifying touchscreen
   * Windows laptops as tablets.
   */

  const coarsePointer =
    window.matchMedia(
      "(pointer: coarse)",
    ).matches;


  const noHover =
    window.matchMedia(
      "(hover: none)",
    ).matches;


  const isWindows =
    /Win/i.test(
      platform,
    ) ||
    /Windows/i.test(
      userAgent,
    );


  const emulatedTouchDevice =
    coarsePointer &&
    noHover &&
    !isWindows;


  return (
    isIOS ||
    isModernIPad ||
    isMacIntelIPad ||
    isAndroid ||
    isMobileUA ||
    emulatedTouchDevice
  );
}


/*
 * Laptop hover mode:
 *
 * 1024px or wider
 * AND
 * not classified as a phone/tablet.
 *
 * We deliberately don't require pointer:fine here.
 *
 * That allows touchscreen Windows laptops to retain
 * the laptop/desktop card experience.
 */

function shouldUseLaptopHoverMode() {
  if (
    typeof window === "undefined"
  ) {
    return false;
  }


  const hasLaptopWidth =
    window.innerWidth >= 1024;


  const isTouchPlatform =
    isPhoneOrTabletPlatform();


  return (
    hasLaptopWidth &&
    !isTouchPlatform
  );
}



/* =========================================================
   FAMILY HISTORY BOOK VIEWER

   Only used by the Family History Document example.
========================================================= */

/* =========================================================
   EXPANDED FAMILY HISTORY READER

   A viewport-sized reader with its own focus trap. The preview
   remains mounted so closing the reader preserves the current page.
========================================================= */

// A4 portrait: page width / page height.
const BOOK_PAGE_RATIO = 210 / 297;
const MAX_BOOK_ZOOM = 4;

function fittedBookPage(width, height) {
  const pageWidth = Math.max(0, Math.min(width - 16, (height - 16) * BOOK_PAGE_RATIO));
  return { width: pageWidth, height: pageWidth / BOOK_PAGE_RATIO };
}

function FamilyHistoryReader({ pages, alt, pageIndex, onPageChange, onClose }) {
  const dialogRef = useRef(null);
  const viewportRef = useRef(null);
  const closeRef = useRef(null);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null);
  const viewRef = useRef({ scale: 1, x: 0, y: 0 });
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const [failedSource, setFailedSource] = useState(null);
  const source = pages[pageIndex];
  const totalPages = pages.length;

  // Clamp panning to the enlarged page rather than letting it disappear offscreen.
  const applyView = useCallback((next) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scale = Math.max(1, Math.min(MAX_BOOK_ZOOM, next.scale));
    const size = fittedBookPage(viewport.clientWidth, viewport.clientHeight);
    const maxX = Math.max(0, (size.width * scale - viewport.clientWidth) / 2);
    const maxY = Math.max(0, (size.height * scale - viewport.clientHeight) / 2);
    const result = {
      scale,
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
    viewRef.current = result;
    setView(result);
  }, []);

  const resetView = useCallback(() => {
    pointersRef.current.clear();
    gestureRef.current = null;
    applyView({ scale: 1, x: 0, y: 0 });
  }, [applyView]);

  const pointInViewport = useCallback((clientX, clientY) => {
    const bounds = viewportRef.current.getBoundingClientRect();
    return {
      x: clientX - bounds.left - bounds.width / 2,
      y: clientY - bounds.top - bounds.height / 2,
    };
  }, []);

  // Keep the same point under the fingers or mouse when zooming.
  const zoomTo = useCallback((scale, focal = { x: 0, y: 0 }) => {
    const current = viewRef.current;
    const nextScale = Math.max(1, Math.min(MAX_BOOK_ZOOM, scale));
    const ratio = nextScale / current.scale;
    applyView({
      scale: nextScale,
      x: focal.x - (focal.x - current.x) * ratio,
      y: focal.y - (focal.y - current.y) * ratio,
    });
  }, [applyView]);

  const changePage = useCallback((nextPage) => {
    if (nextPage < 0 || nextPage >= totalPages || nextPage === pageIndex) return;
    resetView();
    onPageChange(nextPage);
  }, [onPageChange, pageIndex, resetView, totalPages]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const measure = () => {
      setFrame(fittedBookPage(viewport.clientWidth, viewport.clientHeight));
      applyView(viewRef.current);
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(viewport);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [applyView]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(focusFrame);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const handleWheel = (event) => {
      event.preventDefault();
      zoomTo(viewRef.current.scale * Math.exp(-event.deltaY * 0.002), pointInViewport(event.clientX, event.clientY));
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [pointInViewport, zoomTo]);

  const beginGesture = () => {
    const points = Array.from(pointersRef.current.values());
    if (points.length >= 2) {
      const [first, second] = points;
      gestureRef.current = {
        type: "pinch",
        distance: Math.max(1, Math.hypot(second.x - first.x, second.y - first.y)),
        midpoint: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
        view: { ...viewRef.current },
      };
    } else if (points.length === 1) {
      gestureRef.current = { type: "pan", point: points[0], view: { ...viewRef.current } };
    } else {
      gestureRef.current = null;
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, pointInViewport(event.clientX, event.clientY));
    beginGesture();
  };

  const handlePointerMove = (event) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, pointInViewport(event.clientX, event.clientY));
    const gesture = gestureRef.current;
    if (!gesture) return;
    const points = Array.from(pointersRef.current.values());
    if (gesture.type === "pinch" && points.length >= 2) {
      const [first, second] = points;
      const midpoint = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      const scale = Math.max(1, Math.min(MAX_BOOK_ZOOM, gesture.view.scale * distance / gesture.distance));
      const ratio = scale / gesture.view.scale;
      applyView({
        scale,
        x: midpoint.x - (gesture.midpoint.x - gesture.view.x) * ratio,
        y: midpoint.y - (gesture.midpoint.y - gesture.view.y) * ratio,
      });
    } else if (gesture.type === "pan" && points.length === 1 && viewRef.current.scale > 1) {
      applyView({
        scale: gesture.view.scale,
        x: gesture.view.x + points[0].x - gesture.point.x,
        y: gesture.view.y + points[0].y - gesture.point.y,
      });
    }
  };

  const handlePointerEnd = (event) => {
    pointersRef.current.delete(event.pointerId);
    beginGesture();
  };

  const handleKeyDown = useCallback((event) => {
    // Reader keys must not also close or turn pages in the underlying modal.
    event.stopPropagation();
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changePage(pageIndex + (event.key === "ArrowLeft" ? -1 : 1));
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomTo(viewRef.current.scale + 0.5);
    } else if (event.key === "-") {
      event.preventDefault();
      zoomTo(viewRef.current.scale - 0.5);
    } else if (event.key === "0") {
      event.preventDefault();
      resetView();
    } else if (event.key === "Tab") {
      const focusable = Array.from(dialogRef.current.querySelectorAll('button:not([disabled]), [tabindex="0"]'))
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }, [changePage, onClose, pageIndex, resetView, zoomTo]);

  useEffect(() => {
    // Capture keys even when a navigation button becomes disabled at a boundary.
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  const controlClass = "inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-[#704214]/25 bg-[#FFF6E8] px-3 text-[#704214] transition-colors hover:bg-[#F5E6CC] disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#704214] focus-visible:ring-offset-2";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="family-history-reader-title"
      data-cursor-theme="dark"
      data-book-reader="true"
      className="fixed inset-0 z-[9100] grid h-[100dvh] w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-[#EFE7DA] text-[#704214]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-[#704214]/15 bg-[#F5E6CC] px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5">
        <h2 id="family-history-reader-title" className="font-heading text-base sm:text-xl">Family History Document</h2>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close document reader" data-cursor="Close" className={controlClass}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div
        ref={viewportRef}
        role="region"
        aria-label="Zoomable document page"
        tabIndex={0}
        className="relative min-h-0 min-w-0 touch-none overflow-hidden select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#704214]"
        style={{ cursor: view.scale > 1 ? "grab" : "zoom-in" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        onDoubleClick={(event) => zoomTo(viewRef.current.scale > 1 ? 1 : 2, pointInViewport(event.clientX, event.clientY))}
      >
        <div
          className="absolute left-1/2 top-1/2 origin-center overflow-hidden bg-[#FFF6E8] shadow-xl"
          data-book-zoom={view.scale.toFixed(2)}
          data-book-pan-x={view.x.toFixed(2)}
          data-book-pan-y={view.y.toFixed(2)}
          style={{
            width: frame.width,
            height: frame.height,
            transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        >
          {failedSource === source ? (
            <p role="status" className="flex h-full items-center justify-center p-4 text-center font-body">Preview page {pageIndex + 1} is unavailable.</p>
          ) : (
            <img key={source} src={source} alt={`${alt || "Family history document"} — page ${pageIndex + 1}`} draggable={false} decoding="async" onError={() => setFailedSource(source)} className="pointer-events-none block h-full w-full object-contain" />
          )}
        </div>
      </div>

      <footer className="border-t border-[#704214]/15 bg-[#F5E6CC] px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-5">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => changePage(pageIndex - 1)} disabled={pageIndex <= 0} aria-label="Previous reader page" className={`${controlClass} text-2xl`}>‹</button>
            <p aria-live="polite" aria-atomic="true" className="min-w-[6rem] text-center font-body text-base font-semibold">Page {pageIndex + 1} of {totalPages}</p>
            <button type="button" onClick={() => changePage(pageIndex + 1)} disabled={pageIndex >= totalPages - 1} aria-label="Next reader page" className={`${controlClass} text-2xl`}>›</button>
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Document zoom controls">
            <button type="button" onClick={() => zoomTo(viewRef.current.scale - 0.5)} disabled={view.scale <= 1} aria-label="Zoom out" className={`${controlClass} text-xl`}>−</button>
            <output aria-label="Zoom level" className="min-w-[3rem] text-center font-body text-base font-semibold">{Math.round(view.scale * 100)}%</output>
            <button type="button" onClick={() => zoomTo(viewRef.current.scale + 0.5)} disabled={view.scale >= MAX_BOOK_ZOOM} aria-label="Zoom in" className={`${controlClass} text-xl`}>+</button>
            <button type="button" onClick={resetView} aria-label="Fit page to screen" className={`${controlClass} font-body font-semibold`}>Fit</button>
          </div>
        </div>
        <p className="mt-2 text-center font-body text-sm leading-tight text-[#704214]/75">Use + / − or pinch to zoom. Drag to move around the page.</p>
      </footer>
    </div>,
    document.body,
  );
}


/* =========================================================
   FAMILY HISTORY BOOK VIEWER

   Six-page portrait book.

   Desktop:
   - Two portrait pages displayed side by side
   - Front and back covers displayed individually

   Mobile:
   - One portrait page at a time

   Preserves:
   - PageFlip animations
   - Page shadows
   - Mouse dragging and touch swiping
   - Navigation arrows
   - Expanded document reader
   - Current page when expanding / closing
========================================================= */


/* =========================================================
   FAMILY HISTORY BOOK VIEWER — CORRECTED

   - Six portrait pages
   - First spread starts on the left
   - Two-page desktop layout
   - Single-page mobile layout
   - Small, stable corner-hover animation
   - Original animated page turns
   - Subtle centre seam
   - Expanded document with independent page navigation
========================================================= */

function FamilyHistoryBookViewer({
  pages,
  alt,
  isExpanded,
  onExpandedChange,
}) {
  const stageRef = useRef(null);
  const bookContainerRef = useRef(null);
  const pageFlipRef = useRef(null);
  const currentPageRef = useRef(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [readerPage, setReaderPage] = useState(0);
  const [orientation, setOrientation] = useState("portrait");
  const [isReady, setIsReady] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [hoverCorner, setHoverCorner] = useState(null);

  const [bookSize, setBookSize] = useState({
    width: 0,
    height: 0,
  });

  const totalPages = pages?.length ?? 0;

  /* =====================================================
     INITIALIZE AND RESIZE THE PAGEFLIP BOOK
  ===================================================== */

  useEffect(() => {
    const stage = stageRef.current;
    const host = bookContainerRef.current;

    if (!stage || !host || totalPages === 0) {
      return undefined;
    }

    let disposed = false;
    let resizeFrame = null;

    let previousWidth = 0;
    let previousHeight = 0;
    let previousMode = "";

    const destroyBook = () => {
      const instance = pageFlipRef.current;
      pageFlipRef.current = null;

      instance?.destroy();
      host.replaceChildren();
    };

    const createBook = () => {
      if (disposed) return;

      const availableWidth = Math.max(
        0,
        stage.clientWidth - 16
      );

      const availableHeight = Math.max(
        0,
        stage.clientHeight - 16
      );

      if (!availableWidth || !availableHeight) {
        return;
      }

      // Two portrait pages on wider screens.
      // One portrait page on narrower screens.
      const showTwoPages = availableWidth >= 600;

      const mode = showTwoPages
        ? "landscape"
        : "portrait";

      const pageWidth = Math.floor(
        Math.min(
          availableWidth / (showTwoPages ? 2 : 1),
          availableHeight * BOOK_PAGE_RATIO
        )
      );

      const pageHeight = Math.floor(
        pageWidth / BOOK_PAGE_RATIO
      );

      if (pageWidth < 1 || pageHeight < 1) {
        return;
      }

      if (
        pageWidth === previousWidth &&
        pageHeight === previousHeight &&
        mode === previousMode &&
        pageFlipRef.current
      ) {
        return;
      }

      // Complete a turn before rebuilding.
      pageFlipRef.current
        ?.getRender()
        .finishAnimation();

      const startPage = Math.max(
        0,
        Math.min(
          currentPageRef.current,
          totalPages - 1
        )
      );

      destroyBook();

      previousWidth = pageWidth;
      previousHeight = pageHeight;
      previousMode = mode;

      const bookWidth = showTwoPages
        ? pageWidth * 2
        : pageWidth;

      const mount = document.createElement("div");

      mount.style.width = `${bookWidth}px`;
      mount.style.height = `${pageHeight}px`;

      host.style.width = `${bookWidth}px`;
      host.style.height = `${pageHeight}px`;

      host.appendChild(mount);

      setBookSize({
        width: bookWidth,
        height: pageHeight,
      });

      setOrientation(mode);
      setIsReady(false);
      setIsTurning(false);
      setHoverCorner(null);

      /* ===================================================
         PAGEFLIP CONFIGURATION
      =================================================== */

      const instance = new PageFlip(mount, {
        width: pageWidth,
        height: pageHeight,

        size: "fixed",
        startPage,
        autoSize: false,

        // Allow single-page mode on smaller screens.
        usePortrait: true,

        // IMPORTANT:
        // Page 1 now starts on the LEFT.
        // There is no empty cover-facing page.
        showCover: false,

        // Original page-turn animation.
        flippingTime: 900,

        // Keep shadows during real page turns.
        drawShadow: true,
        maxShadowOpacity: 0.38,

        // IMPORTANT:
        // Disable the built-in corner-hover rendering.
        // It caused large areas of a page to disappear.
        //
        // We add our own small CSS corner flap below.
        showPageCorners: false,

        disableFlipByClick: false,
        useMouseEvents: true,
        mobileScrollSupport: true,
        swipeDistance: 24,
      });

      pageFlipRef.current = instance;

      const isCurrent = () =>
        !disposed &&
        pageFlipRef.current === instance;

      const syncPage = (index) => {
        if (!isCurrent()) return;

        currentPageRef.current = index;
        setCurrentPage(index);
      };

      instance.on("flip", ({ data }) => {
        syncPage(data);
        setHoverCorner(null);
      });

      instance.on("init", () => {
        if (!isCurrent()) return;

        syncPage(
          instance.getCurrentPageIndex()
        );

        setOrientation(
          instance.getOrientation()
        );

        setIsReady(true);
        setIsTurning(false);
      });

      instance.on(
        "changeOrientation",
        ({ data }) => {
          if (!isCurrent()) return;

          setOrientation(data);

          syncPage(
            instance.getCurrentPageIndex()
          );

          setHoverCorner(null);
        }
      );

      instance.on("changeState", ({ data }) => {
        if (!isCurrent()) return;

        setIsTurning(
          data === "flipping" ||
          data === "user_fold"
        );

        if (
          data === "flipping" ||
          data === "user_fold"
        ) {
          setHoverCorner(null);
        }
      });

      /* ===================================================
         CREATE THE PORTRAIT BOOK PAGES
      =================================================== */

      const pageElements = pages.map(
        (src, index) => {
          const page = document.createElement("div");

          // A CSS class keeps the background intact
          // even when PageFlip rewrites inline styles.
          page.className =
            "relative overflow-hidden bg-[#FFF6E8]";

          const image = document.createElement("img");

          image.src = src;
          image.alt = `${
            alt || "Family history document"
          } — page ${index + 1}`;

          image.draggable = false;
          image.decoding = "async";

          image.style.cssText = `
            width: 100%;
            height: 100%;
            display: block;
            object-fit: contain;
            user-select: none;
            -webkit-user-drag: none;
          `;

          const fallback = document.createElement("p");

          fallback.textContent =
            `Preview page ${index + 1} is unavailable.`;

          fallback.style.cssText = `
            position: absolute;
            inset: 0;
            margin: 0;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 16px;
            text-align: center;
            color: #704214;
          `;

          image.addEventListener(
            "error",
            () => {
              image.style.display = "none";
              fallback.style.display = "flex";
            },
            { once: true }
          );

          page.append(image, fallback);

          return page;
        }
      );

      instance.loadFromHTML(pageElements);
    };

    /* ===================================================
       RESPONSIVE RESIZE
    =================================================== */

    const scheduleResize = () => {
      if (
        disposed ||
        resizeFrame !== null
      ) {
        return;
      }

      resizeFrame =
        window.requestAnimationFrame(() => {
          resizeFrame = null;
          createBook();
        });
    };

    createBook();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleResize)
        : null;

    observer?.observe(stage);

    window.addEventListener(
      "resize",
      scheduleResize
    );

    window.addEventListener(
      "orientationchange",
      scheduleResize
    );

    return () => {
      disposed = true;

      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }

      observer?.disconnect();

      window.removeEventListener(
        "resize",
        scheduleResize
      );

      window.removeEventListener(
        "orientationchange",
        scheduleResize
      );

      destroyBook();
    };
  }, [pages, totalPages, alt]);

  /* =====================================================
     SPREAD NAVIGATION

     When using a two-page spread:
       1–2, 3–4, 5–6

     When using a single-page view:
       1, 2, 3, 4, 5, 6
  ===================================================== */

  const lastSpreadStart =
    orientation === "landscape"
      ? Math.floor(
          (Math.max(0, totalPages - 1)) / 2
        ) * 2
      : Math.max(0, totalPages - 1);

  const hasPrevious = currentPage > 0;

  const hasNext =
    currentPage < lastSpreadStart;

  const turnPage = useCallback((direction) => {
    const instance = pageFlipRef.current;

    if (!instance) return false;

    const state = instance.getState();

    if (
      state === "flipping" ||
      state === "user_fold" ||
      state === "fold_corner"
    ) {
      return false;
    }

    const index = instance.getCurrentPageIndex();
    const count = instance.getPageCount();

    const mode = instance.getOrientation();

    const lastIndex =
      mode === "landscape"
        ? Math.floor((count - 1) / 2) * 2
        : count - 1;

    if (direction < 0 && index > 0) {
      instance.flipPrev("bottom");
      return true;
    }

    if (direction > 0 && index < lastIndex) {
      instance.flipNext("bottom");
      return true;
    }

    return false;
  }, []);

  /* =====================================================
     SMALL CORNER-HOVER EFFECT

     This does NOT call PageFlip's fold renderer.

     It shows a decorative corner curl without
     changing the position of either book page.

     Actual dragging and clicking still uses PageFlip.
  ===================================================== */

  const handleBookPointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      event.buttons !== 0 ||
      isTurning
    ) {
      setHoverCorner(null);
      return;
    }

    const book = bookContainerRef.current;

    if (!book) return;

    const bounds = book.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    if (
      x < 0 ||
      y < 0 ||
      x > bounds.width ||
      y > bounds.height
    ) {
      setHoverCorner(null);
      return;
    }

    const edge = Math.min(
      42,
      bounds.width * 0.12,
      bounds.height * 0.12
    );

    const nearTop = y <= edge;
    const nearBottom = y >= bounds.height - edge;

    const nearLeft = x <= edge;
    const nearRight = x >= bounds.width - edge;

    let corner = null;

    if (hasPrevious && nearLeft) {
      if (nearTop) {
        corner = "top-left";
      } else if (nearBottom) {
        corner = "bottom-left";
      }
    }

    if (hasNext && nearRight) {
      if (nearTop) {
        corner = "top-right";
      } else if (nearBottom) {
        corner = "bottom-right";
      }
    }

    setHoverCorner(corner);
  };

  /* =====================================================
     KEYBOARD NAVIGATION
  ===================================================== */

  useEffect(() => {
    if (isExpanded) return undefined;

    const handleKeyDown = (event) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          "input, textarea, select, video, " +
          "[contenteditable]:not([contenteditable='false'])"
        )
      ) {
        return;
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();

        turnPage(
          event.key === "ArrowLeft" ? -1 : 1
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [turnPage, isExpanded]);

  /* =====================================================
     EXPANDED READER

     The reader tracks its own page index.

     This is important when the preview displays
     two pages, but the expanded reader displays
     individual pages.
  ===================================================== */

  const goToPage = useCallback(
    (index) => {
      if (totalPages === 0) return;

      const page = Math.max(
        0,
        Math.min(totalPages - 1, index)
      );

      const instance = pageFlipRef.current;

      if (instance) {
        instance.getRender().finishAnimation();

        instance.turnToPage(page);

        const visibleIndex =
          instance.getCurrentPageIndex();

        currentPageRef.current = visibleIndex;
        setCurrentPage(visibleIndex);
      } else {
        currentPageRef.current = page;
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const openReader = () => {
    pageFlipRef.current
      ?.getRender()
      .finishAnimation();

    setReaderPage(currentPageRef.current);
    setHoverCorner(null);

    onExpandedChange(true);
  };

  const closeReader = () => {
    goToPage(readerPage);
    onExpandedChange(false);
  };

  /* =====================================================
     PAGE COUNTER
  ===================================================== */

  const hasTwoVisiblePages =
    orientation === "landscape" &&
    currentPage + 1 < totalPages;

  const pageLabel =
    totalPages === 0
      ? "No pages"
      : hasTwoVisiblePages
        ? `Pages ${currentPage + 1}–${
            currentPage + 2
          } of ${totalPages}`
        : `Page ${currentPage + 1} of ${totalPages}`;

  /* =====================================================
     CORNER FLAP APPEARANCE

     A small triangular curl, independent of PageFlip.
  ===================================================== */

  const cornerPosition = {
    "top-left": "left-0 top-0",
    "top-right": "right-0 top-0",
    "bottom-left": "left-0 bottom-0",
    "bottom-right": "right-0 bottom-0",
  };

  const cornerClips = {
    "top-left": "polygon(0 0, 100% 0, 0 100%)",
    "top-right": "polygon(0 0, 100% 0, 100% 100%)",
    "bottom-left": "polygon(0 0, 0 100%, 100% 100%)",
    "bottom-right": "polygon(100% 0, 100% 100%, 0 100%)",
  };

  const arrowClassName =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#704214]/20 bg-[#704214] text-[1.6rem] leading-none text-[#FFF6E8] shadow-md transition-colors hover:bg-[#9C645E] disabled:cursor-not-allowed disabled:opacity-25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#704214] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE7DA]";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="
        relative w-full overflow-hidden
        rounded-[20px]
        border border-[#704214]/15
        bg-[#EFE7DA]
        px-1 pb-3 pt-14
        shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]
        sm:rounded-[28px] sm:px-4 sm:pb-4 sm:pt-10
        lg:rounded-[34px]
      "
    >
      {/* READING INSTRUCTIONS */}

      <p
        className="
          mb-3 px-2 text-center
          font-body text-sm leading-tight
          text-[#704214]/75 sm:text-base
        "
      >
        {totalPages > 0
          ? "Drag the page, swipe, or use the arrows to browse the book."
          : "No preview pages are available yet."}
      </p>

      {/* BOOK NAVIGATION */}

      <div
        className="
          mx-auto grid w-full max-w-[920px]
          grid-cols-[44px_minmax(0,1fr)_44px]
          items-center gap-x-3 gap-y-3
        "
      >
        {/* PREVIOUS BUTTON */}

        <button
          type="button"
          onClick={() => turnPage(-1)}
          disabled={!isReady || isTurning || !hasPrevious}
          aria-label="Turn to previous page"
          className={`${arrowClassName} order-2 sm:order-1`}
        >
          ‹
        </button>

        {/* BOOK STAGE */}

        <div
          ref={stageRef}
          onPointerMove={handleBookPointerMove}
          onPointerLeave={() => setHoverCorner(null)}
          onPointerDown={() => setHoverCorner(null)}
          className="
            relative order-1 col-span-3
            flex w-full min-w-0
            items-center justify-center
            overflow-hidden
            sm:order-2 sm:col-span-1
          "
          style={{
            height: "min(65dvh, 560px)",
            minHeight: 250,
          }}
        >
          {/* BOOK WRAPPER */}

          <div
            className="relative shrink-0"
            style={{
              width: bookSize.width,
              height: bookSize.height,
            }}
          >
            {/* PAGEFLIP MOUNT */}

            <div
              ref={bookContainerRef}
              aria-label={alt}
              className="
                relative h-full w-full
                shadow-[0_12px_30px_rgba(70,37,5,0.22)]
              "
            />

            {/* ===================================
                FAINT LINE BETWEEN TWO PAGES

                Shows only in two-page mode.
                Does not block mouse interaction.
            =================================== */}

            {orientation === "landscape" &&
              totalPages > 1 && (
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-y-0 left-1/2
                    z-[200]
                    w-[3px]
                  "
                  style={{
                    transform: "translateX(-50%)",
                    background:
                      "linear-gradient(90deg, " +
                      "rgba(112,66,20,0.05), " +
                      "rgba(112,66,20,0.16) 50%, " +
                      "rgba(255,255,255,0.45))",
                    boxShadow:
                      "0 0 3px rgba(112,66,20,0.08)",
                  }}
                />
              )}

            {/* ===================================
                STABLE CORNER HOVER ANIMATION

                Only a small flap moves.
                Full pages stay in place.

                PageFlip handles actual turns.
            =================================== */}

            <AnimatePresence>
              {hoverCorner && !isTurning && (
                <motion.div
                  key={hoverCorner}
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute
                    z-[300]
                    h-10 w-10
                    ${cornerPosition[hoverCorner]}
                  `}
                  style={{
                    clipPath:
                      cornerClips[hoverCorner],

                    background:
                      "linear-gradient(135deg, " +
                      "#FFF6E8 0%, " +
                      "#E2D4C3 65%, " +
                      "#C7B7A6 100%)",

                    boxShadow:
                      "0 2px 5px rgba(70,37,5,0.20)",

                    transformOrigin:
                      hoverCorner,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE PAGE COUNTER */}

        <p
          aria-live="polite"
          aria-atomic="true"
          className="
            order-3 text-center
            font-body text-base font-semibold
            leading-5 text-[#704214]
            sm:hidden
          "
        >
          {pageLabel}
        </p>

        {/* NEXT BUTTON */}

        <button
          type="button"
          onClick={() => turnPage(1)}
          disabled={!isReady || isTurning || !hasNext}
          aria-label="Turn to next page"
          className={`${arrowClassName} order-4 sm:order-3`}
        >
          ›
        </button>
      </div>

      {/* DESKTOP PAGE COUNTER */}

      <p
        aria-live="polite"
        aria-atomic="true"
        className="
          mt-3 hidden text-center
          font-body text-base font-semibold
          leading-5 text-[#704214]
          sm:block
        "
      >
        {pageLabel}
      </p>

      {/* EXPAND DOCUMENT BUTTON */}

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={openReader}
          disabled={!isReady || totalPages === 0}
          className="
            inline-flex min-h-11 w-full
            items-center justify-center gap-2
            rounded-full
            border border-[#704214]/25
            bg-[#FFF6E8] px-4
            font-body text-base font-semibold
            text-[#704214]
            transition-colors hover:bg-[#F5E6CC]
            disabled:opacity-30
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#704214]
            focus-visible:ring-offset-2
            sm:w-auto
          "
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
          </svg>

          Expand document
        </button>
      </div>

      {/* FULLSCREEN DOCUMENT READER */}

      {isExpanded && (
        <FamilyHistoryReader
          pages={pages}
          alt={alt}
          pageIndex={readerPage}
          onPageChange={setReaderPage}
          onClose={closeReader}
        />
      )}
    </div>
  );
}



/* =========================================================
   EXAMPLE MODAL
========================================================= */

function ExampleModal({
  example,
  onClose,
}) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const readerOpenRef = useRef(false);
  const handleReaderOpenChange = useCallback((isOpen) => {
    readerOpenRef.current = isOpen;
    setIsReaderOpen(isOpen);
  }, []);

  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);


  const onCloseRef =
    useRef(onClose);


  const closeButtonRef =
    useRef(null);


  const dialogRef =
    useRef(null);


  const previousExampleIdRef =
    useRef(example?.id);


  useEffect(() => {
    onCloseRef.current =
      onClose;
  }, [onClose]);


  const media =
    example?.media ?? [];


  const totalSlides =
    media.length;


  const activeMedia =
    media[currentSlide];


  const isBookMedia =
    activeMedia?.type ===
      "book";


  /* =====================================================
     PREVIOUS SLIDE
  ===================================================== */

  const showPrevious = () => {
    if (totalSlides <= 1) {
      return;
    }


    setCurrentSlide(
      (current) =>
        current === 0
          ? totalSlides - 1
          : current - 1,
    );
  };


  /* =====================================================
     NEXT SLIDE
  ===================================================== */

  const showNext = () => {
    if (totalSlides <= 1) {
      return;
    }


    setCurrentSlide(
      (current) =>
        current ===
        totalSlides - 1
          ? 0
          : current + 1,
    );
  };


  /* =====================================================
     VIEW PACKAGES
  ===================================================== */

  const handleGoToPackages = () => {
    /*
     * Close first so the page scroll lock is removed.
     */

    onCloseRef.current?.();


    /*
     * Wait for the modal closing animation.
     */

    window.setTimeout(() => {
      const packagesSection =
        document.getElementById(
          "packages",
        );


      packagesSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 450);
  };


  /* =====================================================
     RESET SLIDER
  ===================================================== */

  useEffect(() => {
    if (
      previousExampleIdRef.current ===
      example?.id
    ) {
      return undefined;
    }


    previousExampleIdRef.current =
      example?.id;


    const resetTimer =
      window.setTimeout(() => {
        setCurrentSlide(0);
      }, 0);


    return () => {
      window.clearTimeout(
        resetTimer,
      );
    };
  }, [example?.id]);


  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useLayoutEffect(() => {
    if (!example) {
      return undefined;
    }


    const html =
      document.documentElement;


    const body =
      document.body;


    const scrollX =
      window.scrollX;


    const scrollY =
      window.scrollY;


    const scrollbarWidth =
      window.innerWidth -
      html.clientWidth;


    const previous = {
      htmlOverflow:
        html.style.overflow,

      htmlOverscroll:
        html.style
          .overscrollBehavior,

      htmlScrollBehavior:
        html.style
          .scrollBehavior,

      bodyOverflow:
        body.style.overflow,

      bodyOverscroll:
        body.style
          .overscrollBehavior,

      bodyPosition:
        body.style.position,

      bodyTop:
        body.style.top,

      bodyLeft:
        body.style.left,

      bodyRight:
        body.style.right,

      bodyWidth:
        body.style.width,

      bodyPaddingRight:
        body.style.paddingRight,
    };


    html.style.overflow =
      "hidden";


    html.style.overscrollBehavior =
      "none";


    body.style.overflow =
      "hidden";


    body.style.overscrollBehavior =
      "none";


    body.style.position =
      "fixed";


    body.style.top =
      `-${scrollY}px`;


    body.style.left =
      `-${scrollX}px`;


    body.style.right =
      "0";


    body.style.width =
      "100%";


    if (scrollbarWidth > 0) {
      body.style.paddingRight =
        `${scrollbarWidth}px`;
    }


    return () => {
      html.style.scrollBehavior =
        "auto";


      html.style.overflow =
        previous.htmlOverflow;


      html.style.overscrollBehavior =
        previous.htmlOverscroll;


      body.style.overflow =
        previous.bodyOverflow;


      body.style.overscrollBehavior =
        previous.bodyOverscroll;


      body.style.position =
        previous.bodyPosition;


      body.style.top =
        previous.bodyTop;


      body.style.left =
        previous.bodyLeft;


      body.style.right =
        previous.bodyRight;


      body.style.width =
        previous.bodyWidth;


      body.style.paddingRight =
        previous.bodyPaddingRight;


      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: "auto",
      });


      requestAnimationFrame(() => {
        html.style.scrollBehavior =
          previous.htmlScrollBehavior;
      });
    };
  }, [example]);


  /* =====================================================
     KEYBOARD + FOCUS MANAGEMENT
  ===================================================== */

  useEffect(() => {
    if (!example) {
      return undefined;
    }


    const previouslyFocused =
      document.activeElement;


    /*
     * Focus the close button when the modal opens.
     */

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });


    const handleKeyDown = (
      event,
    ) => {
      if (readerOpenRef.current) return;

      /* ESCAPE */

      if (
        event.key === "Escape"
      ) {
        event.preventDefault();

        onCloseRef.current?.();

        return;
      }


      /* PREVIOUS */

      if (
        event.key ===
          "ArrowLeft" &&
        totalSlides > 1
      ) {
        event.preventDefault();


        setCurrentSlide(
          (current) =>
            current === 0
              ? totalSlides - 1
              : current - 1,
        );


        return;
      }


      /* NEXT */

      if (
        event.key ===
          "ArrowRight" &&
        totalSlides > 1
      ) {
        event.preventDefault();


        setCurrentSlide(
          (current) =>
            current ===
            totalSlides - 1
              ? 0
              : current + 1,
        );


        return;
      }


      /*
       * Focus trap.
       */

      if (
        event.key !== "Tab"
      ) {
        return;
      }


      const dialog =
        dialogRef.current;


      if (!dialog) {
        return;
      }


      const focusableElements =
        Array.from(
          dialog.querySelectorAll(
            `
              button:not([disabled]),
              a[href],
              input:not([disabled]),
              select:not([disabled]),
              textarea:not([disabled]),
              video[controls],
              [tabindex]:not([tabindex="-1"])
            `,
          ),
        ).filter(
          (element) =>
            element.offsetParent !==
            null,
        );


      if (
        focusableElements.length ===
        0
      ) {
        return;
      }


      const firstElement =
        focusableElements[0];


      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];


      if (
        event.shiftKey &&
        document.activeElement ===
          firstElement
      ) {
        event.preventDefault();

        lastElement.focus();

        return;
      }


      if (
        !event.shiftKey &&
        document.activeElement ===
          lastElement
      ) {
        event.preventDefault();

        firstElement.focus();
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyDown,
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );


      /*
       * Return focus to the card/button
       * that opened the modal.
       */

      requestAnimationFrame(() => {
        if (
          previouslyFocused instanceof
          HTMLElement
        ) {
          previouslyFocused.focus();
        }
      });
    };
  }, [
    example,
    totalSlides,
  ]);


  /* =====================================================
     AUTO ADVANCE SLIDES
  ===================================================== */

  useEffect(() => {
    if (
      !example ||
      totalSlides <= 1 ||
      activeMedia?.type ===
        "video" ||
      activeMedia?.type ===
        "youtube" ||
      activeMedia?.type ===
        "book"
    ) {
      return undefined;
    }


    const timer =
      window.setTimeout(() => {
        setCurrentSlide(
          (current) =>
            current ===
            totalSlides - 1
              ? 0
              : current + 1,
        );
      }, 5000);


    return () => {
      window.clearTimeout(
        timer,
      );
    };
  }, [
    example,
    currentSlide,
    totalSlides,
    activeMedia?.type,
  ]);


  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }


  return createPortal(
    <AnimatePresence>
      {example && (
        <motion.div
          aria-hidden={isReaderOpen || undefined}
          inert={isReaderOpen}
          data-cursor-theme="light"
          className="
            fixed
            inset-0
            z-[9000]

            flex
            items-center
            justify-center

            overflow-hidden
            overscroll-none

            bg-[radial-gradient(circle_at_top,rgba(156,100,94,0.30),rgba(28,28,28,0.84)_50%,rgba(12,8,5,0.96)_100%)]

            px-3
            py-5

            backdrop-blur-md

            sm:px-6
            sm:py-8

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-2

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-2
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          onPointerDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onCloseRef.current?.();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal={isReaderOpen ? undefined : true}
            aria-labelledby={`example-title-${example.id}`}
            aria-describedby={`example-description-${example.id}`}
            data-cursor-theme="dark"
            className={`
              relative
              my-auto

              max-h-[calc(100dvh-2rem)]

              w-full

              max-w-[980px]

              overflow-hidden

              rounded-[28px]

              bg-[#F5E6CC]

              text-[#1C1C1C]

              shadow-[0_30px_100px_rgba(0,0,0,0.55)]

              sm:rounded-[38px]

              md:max-h-[calc(100dvh-4rem)]

              lg:rounded-[48px]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-1rem)]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:rounded-[24px]
            `}
            initial={{
              opacity: 0,
              y: 45,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            transition={{
              duration: 0.42,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() =>
                onCloseRef.current?.()
              }
              aria-label="Close example"
              data-cursor="Close"
              className="
                group

                absolute
                right-4
                top-4
                z-40

                grid
                h-11
                w-11
                place-items-center

                rounded-full

                bg-[#F5E6CC]/95

                p-0

                text-[#704214]

                shadow-md
                backdrop-blur-md

                transition
                duration-300

                hover:bg-white

                focus:outline-none

                focus-visible:ring-2
                focus-visible:ring-[#704214]
                focus-visible:ring-offset-2

                sm:right-6
                sm:top-6

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:right-3

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:top-3

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-9

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:w-9
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="
                  h-5
                  w-5

                  transition-transform
                  duration-300

                  group-hover:rotate-90
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>


            {/* =================================================
                SCROLLABLE MODAL CONTENT
            ================================================= */}

            <div
              className="
                max-h-[calc(100dvh-2rem)]

                overflow-y-auto
                overscroll-contain
                touch-pan-y

                [scrollbar-width:none]

                [-ms-overflow-style:none]

                [&::-webkit-scrollbar]:hidden

                md:max-h-[calc(100dvh-4rem)]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-1rem)]
              "
            >
              {/* ===============================================
                  MEDIA
              =============================================== */}

              <div
                className={`
                  ${isBookMedia ? "p-2 pb-0 sm:p-7 sm:pb-0" : "p-4 pb-0 sm:p-7 sm:pb-0"}

                  ${
                    isBookMedia
                      ? "lg:p-8 lg:pb-0"
                      : "lg:p-12 lg:pb-0"
                  }

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:p-3

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pb-0
                `}
              >
                {isBookMedia ? (
                  /*
                   * FAMILY HISTORY DOCUMENT ONLY:
                   * replace the normal image frame with
                   * the interactive page-turning book.
                   */
                  <FamilyHistoryBookViewer
                    isExpanded={isReaderOpen}
                    onExpandedChange={handleReaderOpenChange}
                    pages={
                      activeMedia.pages
                    }
                    alt={
                      activeMedia.alt
                    }
                  />
                ) : (
                  <>
                    <div
                      className="
                        relative

                        aspect-[16/10]

                        overflow-hidden

                        rounded-[20px]

                        bg-[#1C1C1C]

                        sm:rounded-[28px]

                        lg:rounded-[34px]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:aspect-auto

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[170px]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:rounded-[18px]
                      "
                    >
                      <AnimatePresence
                        mode="wait"
                      >
                        <motion.div
                          key={`${example.id}-${currentSlide}`}
                          className="
                            absolute
                            inset-0
                          "
                          initial={{
                            opacity: 0,
                            x: 35,
                            scale: 1.02,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            x: -35,
                            scale: 0.99,
                          }}
                          transition={{
                            duration: 0.4,

                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                        >
                          {activeMedia?.type ===
                          "youtube" ? (
                            <iframe
                              src={
                                activeMedia.src
                              }
                              title={
                                activeMedia.alt
                              }
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="h-full w-full bg-black"
                            />
                          ) : activeMedia?.type ===
                            "video" ? (
                            <video
                              src={
                                activeMedia.src
                              }
                              poster={
                                activeMedia.poster
                              }
                              controls
                              playsInline
                              preload="metadata"
                              aria-label={
                                activeMedia.alt
                              }
                              className="
                                h-full
                                w-full

                                bg-black

                                object-cover
                                object-center
                              "
                            />
                          ) : (
                            <img
                              src={
                                activeMedia?.src
                              }
                              alt={
                                activeMedia?.alt ??
                                ""
                              }
                              loading="lazy"
                              decoding="async"
                              className={`
                                h-full
                                w-full

                                scale-[1.01]

                                ${
                                  activeMedia?.fit ===
                                  "contain"
                                    ? "object-contain"
                                    : "object-cover"
                                }

                                object-center
                              `}
                              style={{
                                objectPosition:
                                  activeMedia?.position ??
                                  "center",
                              }}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>


                      {/* IMAGE OVERLAY */}

                      {activeMedia?.type ===
                        "image" && (
                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none

                            absolute
                            inset-0

                            bg-gradient-to-t

                            from-[#422508]/25
                            via-transparent
                            to-[#F5E6CC]/10

                            mix-blend-multiply
                          "
                        />
                      )}


                      {/* SLIDER CONTROLS */}

                      {totalSlides > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={
                              showPrevious
                            }
                            aria-label="Show previous media"
                            className="
                              absolute
                              left-3
                              top-1/2
                              z-20

                              flex
                              h-10
                              w-10
                              -translate-y-1/2

                              items-center
                              justify-center

                              rounded-full

                              bg-[#1C1C1C]/55

                              text-[24px]
                              text-white

                              backdrop-blur-md

                              transition

                              hover:bg-[#704214]

                              focus:outline-none
                              focus:ring-2
                              focus:ring-white

                              sm:left-5
                              sm:h-12
                              sm:w-12
                            "
                          >
                            ‹
                          </button>


                          <button
                            type="button"
                            onClick={
                              showNext
                            }
                            aria-label="Show next media"
                            className="
                              absolute
                              right-3
                              top-1/2
                              z-20

                              flex
                              h-10
                              w-10
                              -translate-y-1/2

                              items-center
                              justify-center

                              rounded-full

                              bg-[#1C1C1C]/55

                              text-[24px]
                              text-white

                              backdrop-blur-md

                              transition

                              hover:bg-[#704214]

                              focus:outline-none
                              focus:ring-2
                              focus:ring-white

                              sm:right-5
                              sm:h-12
                              sm:w-12
                            "
                          >
                            ›
                          </button>


                          <div
                            aria-live="polite"
                            className="
                              absolute
                              bottom-3
                              right-3
                              z-20

                              rounded-full

                              bg-black/55

                              px-3
                              py-1

                              font-body
                              text-[14px]
                              text-white

                              backdrop-blur-md

                              sm:bottom-5
                              sm:right-5
                            "
                          >
                            {currentSlide + 1} /{" "}
                            {totalSlides}
                          </div>
                        </>
                      )}
                    </div>


                    {/* SLIDER DOTS */}

                    {totalSlides > 1 && (
                      <div
                        className="
                          mt-4

                          flex
                          items-center
                          justify-center

                          gap-2
                        "
                      >
                        {media.map(
                          (
                            slide,
                            index,
                          ) => (
                            <button
                              key={`${slide.src}-${index}`}
                              type="button"
                              onClick={() =>
                                setCurrentSlide(
                                  index,
                                )
                              }
                              aria-label={`Show slide ${
                                index + 1
                              }`}
                              aria-current={
                                currentSlide ===
                                index
                                  ? "true"
                                  : undefined
                              }
                              className={`
                                h-2.5

                                rounded-full

                                transition-all
                                duration-300

                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#704214]

                                ${
                                  currentSlide ===
                                  index
                                    ? "w-9 bg-[#704214]"
                                    : "w-2.5 bg-[#704214]/30 hover:bg-[#704214]/60"
                                }
                              `}
                            />
                          ),
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>


              {/* ===============================================
                  MODAL TEXT
              =============================================== */}

              <div
                className="
                  px-5
                  pb-6
                  pt-9

                  sm:px-10
                  sm:pb-10

                  lg:px-14
                  lg:pb-14
                  lg:pt-11

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-5

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pb-6

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pt-5
                "
              >
                <div>
                  <h2
                    id={`example-title-${example.id}`}
                    className="
                      section-heading

                      text-[2rem]

                      sm:text-[2.35rem]

                      lg:text-[2.7rem]

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.8rem]
                    "
                  >
                    {example.modalTitle}
                  </h2>


                  <span
                    aria-hidden="true"
                    className="
                      mt-3
                      block

                      h-[3px]
                      w-[58px]

                      bg-[#704214]
                    "
                  />
                </div>


                <p
                  className="
                    mt-6

                    section-body

                    text-[1.15rem]
                    font-bold
                    italic

                    text-[#704214]

                    sm:mt-8
                    sm:text-[1.35rem]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.05rem]
                  "
                >
                  {example.subtitle}
                </p>


                <p
                  id={`example-description-${example.id}`}
                  className="
                    mt-5

                    section-body

                    leading-[1.55]

                    sm:mt-7
                    sm:leading-[1.6]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.45]
                  "
                >
                  {example.description}
                </p>


                {/* FEATURES */}

                <div
                  className="
                    mt-7

                    sm:mt-9

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
                  "
                >
                  <ul
                    className="
                      space-y-3

                      sm:space-y-4

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:space-y-2
                    "
                  >
                    {example.features.map(
                      (feature) => (
                        <li
                          key={
                            feature
                          }
                          className="
                            flex
                            items-start

                            gap-4

                            section-body

                            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-3

                            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]
                          "
                        >
                          <span
                            aria-hidden="true"
                            className="
                              mt-1

                              flex
                              h-7
                              w-7
                              shrink-0

                              items-center
                              justify-center

                              rounded-full

                              bg-[#704214]

                              text-[14px]
                              text-[#F5E6CC]

                              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-6

                              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:w-6

                              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[12px]
                            "
                          >
                            ✓
                          </span>


                          <span>
                            {feature}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>


                {/* PACKAGES BUTTON */}

                <button
                  type="button"
                  onClick={
                    handleGoToPackages
                  }
                  className="
                    mt-8

                    flex
                    min-h-[56px]
                    w-full

                    items-center
                    justify-center

                    rounded-[18px]

                    bg-[#566735]

                    px-5
                    py-3

                    text-center

                    section-body

                    text-[18px]
                    font-semibold

                    text-[#F5E6CC]

                    transition
                    duration-300

                    hover:bg-[#704214]

                    focus:outline-none

                    focus:ring-2
                    focus:ring-[#ffffff]
                    focus:ring-offset-2

                    sm:mt-10
                    sm:min-h-[58px]
                    sm:text-[24px]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-[50px]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[17px]
                  "
                >
                  View Our Packages
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,

    document.body,
  );
}


/* =========================================================
   EXAMPLE CARD
========================================================= */

function ExampleCard({
  card,
  laptopHoverMode,
  isLastCard,
  onOpen,
}) {
  /*
   * Tablet:
   * third card fills both columns.
   *
   * Desktop:
   * third card returns to normal.
   */

  const lastCardClass =
    isLastCard
      ? "md:col-span-2 xl:col-span-1"
      : "";


  /* =====================================================
     LAPTOP / DESKTOP CARD

     HOVER:
     - image zooms
     - title moves down
     - title fades
     - button rises
     - button fades in
  ===================================================== */

  if (laptopHoverMode) {
    return (
      <article
        data-cursor-theme="light"
        className={`
          group
          relative

          h-[300px]
          w-full

          overflow-hidden

          rounded-[34px]

          bg-[#FFF6E8]

          shadow-[0_14px_35px_rgba(112,66,20,0.18)]

          ${lastCardClass}
        `}
      >
        {/* IMAGE */}

        {card.youtubeSrc ? (
          <iframe
            src={card.youtubeSrc}
            title={card.alt}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full bg-black"
          />
        ) : (
          <img
            src={card.image}
            alt={card.alt}
            loading="lazy"
            decoding="async"
            className={`
              absolute
              inset-0

              h-full
              w-full

              object-cover
              object-center

              transition-transform
              duration-700

              group-hover:scale-110
              group-focus-within:scale-110

              ${card.imageClass}
            `}
          />
        )}


        {/* GRADIENT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t

            from-[#6F5B46]/80
            via-[#DEDEDE]/11
            via-[#6F5B46]/30
            to-transparent
          "
        />


        {/* SEE MORE BUTTON */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-20

            flex
            items-center
            justify-center
          "
        >
          <button
            type="button"
            onClick={
              onOpen
            }
            aria-haspopup="dialog"
            aria-label={`View ${card.example.modalTitle}`}
            className="
              pointer-events-auto

              translate-y-24
              opacity-0

              rounded-2xl

              border
              border-[#F5E6CC]

              bg-[#F5E6CC]/10

              px-8
              py-3

              backdrop-blur-sm

              section-body

              text-[1.18rem]
              text-[#F5E6CC]

              tracking-[0.1em]

              transition-all
              duration-500

              group-hover:translate-y-0
              group-hover:opacity-100

              focus-visible:translate-y-0
              focus-visible:opacity-100

              hover:border-[#566735]
              hover:bg-[#566735]
              hover:text-white

              focus:outline-none

              focus-visible:ring-2
              focus-visible:ring-[#FFF6E8]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#422508]
            "
          >
            See More →
          </button>
        </div>


        {/* TITLE */}

        <div
          className="
            pointer-events-none

            absolute
            bottom-8
            left-0
            right-0
            z-20

            px-6

            text-center

            transition-all
            duration-500

            group-hover:translate-y-8
            group-hover:opacity-0

            group-focus-within:translate-y-8
            group-focus-within:opacity-0
          "
        >
          <h3
            className="
              section-body

              [text-shadow:0_4px_40px_rgba(0,0,0,0.9)]

              text-[1.67rem]

              leading-tight

              text-[#FEFBF6]
            "
          >
            {card.title}
          </h3>
        </div>
      </article>
    );
  }


  /* =====================================================
     PHONE / TABLET / IPAD CARD

     NO hover animation.

     One tap anywhere on the card opens the modal.
  ===================================================== */

  return (
    <button
      type="button"
      onClick={
        onOpen
      }
      aria-haspopup="dialog"
      aria-label={`View ${card.example.modalTitle}`}
      data-cursor-theme="light"
      className={`
        relative

        h-[280px]
        w-full

        overflow-hidden

        rounded-[30px]

        bg-[#FFF6E8]

        shadow-[0_14px_35px_rgba(112,66,20,0.18)]

        outline-none

        transition-transform
        duration-200

        active:scale-[0.985]

        focus-visible:ring-2
        focus-visible:ring-[#704214]
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[#F5E6CC]

        sm:h-[300px]
        sm:rounded-[34px]

        md:h-[300px]

        ${lastCardClass}

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[230px]
      `}
    >
      {/* IMAGE */}

      {card.youtubeSrc ? (
        <iframe
          src={card.youtubeSrc}
          title={card.alt}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full bg-black"
        />
      ) : (
        <img
          src={card.image}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className={`
            absolute
            inset-0

            h-full
            w-full

            object-cover
            object-center

            ${card.imageClass}
          `}
        />
      )}


      {/* GRADIENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-t

          from-[#422508]/50
          via-[#DEDEDE]/9
          to-transparent
        "
      />


      {/* TITLE */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-7
          left-0
          right-0
          z-20

          px-6

          text-center

          sm:bottom-8
        "
      >
        <h3
          className="
            section-body

            [text-shadow:0_4px_40px_rgba(0,0,0,0.9)]

            text-[1.5rem]

            leading-tight

            text-[#FEFBF6]

            sm:text-[1.67rem]

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.4rem]
          "
        >
          {card.title}
        </h3>
      </div>
    </button>
  );
}


/* =========================================================
   EXAMPLES SECTION
========================================================= */

export default function Examples() {
  const [
    selectedExample,
    setSelectedExample,
  ] = useState(null);


  const [
    laptopHoverMode,
    setLaptopHoverMode,
  ] = useState(() =>
    shouldUseLaptopHoverMode(),
  );


  /* =====================================================
     RESPONSIVE INTERACTION MODE
  ===================================================== */

  useEffect(() => {
    let frameId = null;


    const updateInteractionMode =
      () => {
        if (frameId !== null) {
          window.cancelAnimationFrame(
            frameId,
          );
        }


        frameId =
          window.requestAnimationFrame(
            () => {
              setLaptopHoverMode(
                shouldUseLaptopHoverMode(),
              );

              frameId = null;
            },
          );
      };


    /*
     * Calculate once immediately.
     */

    updateInteractionMode();


    /*
     * Recalculate on browser resize.
     */

    window.addEventListener(
      "resize",
      updateInteractionMode,
    );


    /*
     * Recalculate when rotating a device.
     */

    window.addEventListener(
      "orientationchange",
      updateInteractionMode,
    );


    /*
     * These media queries help Chrome update
     * the state correctly when switching between
     * desktop and device emulation.
     */

    const coarseQuery =
      window.matchMedia(
        "(pointer: coarse)",
      );


    const hoverQuery =
      window.matchMedia(
        "(hover: hover)",
      );


    coarseQuery.addEventListener(
      "change",
      updateInteractionMode,
    );


    hoverQuery.addEventListener(
      "change",
      updateInteractionMode,
    );


    return () => {
      window.removeEventListener(
        "resize",
        updateInteractionMode,
      );


      window.removeEventListener(
        "orientationchange",
        updateInteractionMode,
      );


      coarseQuery.removeEventListener(
        "change",
        updateInteractionMode,
      );


      hoverQuery.removeEventListener(
        "change",
        updateInteractionMode,
      );


      if (frameId !== null) {
        window.cancelAnimationFrame(
          frameId,
        );
      }
    };
  }, []);


  return (
    <>
      <section
        id="examples"
        className="
          min-h-screen

          bg-[#F5E6CC]

          px-6
          py-16

          text-[#1C1C1C]

          sm:px-8
          sm:py-20

          md:px-12

          lg:px-16

          xl:px-20

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-14
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
          "
        >
          {/* =================================================
              SECTION NAME
          ================================================= */}

          <ScrollReveal
            as="p"
            className="
              mb-2
              section-name
            "
            style={{
              WebkitTextStroke:
                "0.45px currentColor",
            }}
          >
            Examples of Our Client Work
          </ScrollReveal>


          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <ScrollReveal
            as="h2"
            className="
              mt-8

              max-w-5xl

              section-heading

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
            "
          >
            A Glimpse Into Preserved Family Stories
          </ScrollReveal>


          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <ScrollReveal
            as="p"
            className="
              mt-7

              max-w-5xl

              section-body

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
            "
          >
            Every family history project is unique. Some clients want to
            understand where they come from and want to trace a particular
            family line generations back and see this depicted in family tree
            charts and written up family histories, and others want a living
            relative’s life story captured by means of oral history interviews.
            Below are examples of the types of work that can be created through
            our genealogy research process.
          </ScrollReveal>


          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <ScrollReveal
            as="p"
            className="
              mt-6

              max-w-4xl

              section-body
              cursive
              italic

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4
            "
          >
            All examples shown here are sample or anonymised representations of
            client work.
          </ScrollReveal>


          {/* =================================================
              CARDS

              PHONE
              1 COLUMN

              TABLET / IPAD
              2 COLUMNS

              LAPTOP 1024–1279
              2 COLUMNS + HOVER

              DESKTOP 1280+
              3 COLUMNS + HOVER
          ================================================= */}

          <ScrollReveal
            as="div"
            className="
              mt-12

              grid
              grid-cols-1

              gap-8

              md:grid-cols-2

              xl:grid-cols-3

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-9

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-6
            "
          >
            {exampleCards.map(
              (
                card,
                index,
              ) => (
                <ExampleCard
                  key={
                    card.example.id
                  }
                  card={card}
                  laptopHoverMode={
                    laptopHoverMode
                  }
                  isLastCard={
                    index === 2
                  }
                  onOpen={() =>
                    setSelectedExample(
                      card.example,
                    )
                  }
                />
              ),
            )}
          </ScrollReveal>
        </div>
      </section>


      {/* =================================================
          EXAMPLE MODAL
      ================================================= */}

      <ExampleModal
        example={
          selectedExample
        }
        onClose={() =>
          setSelectedExample(
            null,
          )
        }
      />
    </>
  );
}
