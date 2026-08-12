import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const cursorThemes = {
  light: {
    dot: "#FFFFFF",
    ring: "rgba(255, 255, 255, 0.95)",
    background: "rgba(255, 255, 255, 0.04)",
    hoverBackground: "rgba(255, 255, 255, 0.18)",
    text: "#FFFFFF",
  },

  dark: {
    dot: "#704214",
    ring: "rgba(112, 66, 20, 0.9)",
    background: "rgba(112, 66, 20, 0.05)",
    hoverBackground: "rgba(86, 103, 53, 0.01)",
    text: "#704214",
  },

  rose: {
    dot: "#9C645E",
    ring: "rgba(156, 100, 94, 0.95)",
    background: "rgba(156, 100, 94, 0.08)",
    hoverBackground: "rgba(156, 100, 94, 0.92)",
    text: "#F5E6CC",
  },

  olive: {
    dot: "#566735",
    ring: "rgba(86, 103, 53, 0.95)",
    background: "rgba(86, 103, 53, 0.08)",
    hoverBackground: "rgba(86, 103, 53, 0.95)",
    text: "#F5E6CC",
  },
};

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /*
   * The ring follows the true pointer position
   * with a smooth spring delay.
   */
  const ringX = useSpring(mouseX, {
    stiffness: 420,
    damping: 30,
    mass: 0.55,
  });

  const ringY = useSpring(mouseY, {
    stiffness: 420,
    damping: 30,
    mass: 0.55,
  });

  /*
   * Calculate where the true pointer is in relation
   * to the centre of the trailing ring.
   *
   * When the ring catches up:
   * mouseX - ringX = 0
   * mouseY - ringY = 0
   *
   * The dot therefore settles in the centre.
   */
  const dotOffsetX = useTransform(
    () => mouseX.get() - ringX.get()
  );

  const dotOffsetY = useTransform(
    () => mouseY.get() - ringY.get()
  );

  const lastPointerPosition = useRef({
    x: -100,
    y: -100,
  });

  const animationFrameRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");
  const [cursorTheme, setCursorTheme] = useState("dark");

  const theme = cursorThemes[cursorTheme] ?? cursorThemes.dark;

  useEffect(() => {
    /*
     * Determines which section or interactive element
     * is currently underneath the pointer.
     */
    const updateCursorTarget = (x, y) => {
      const target = document.elementFromPoint(x, y);

      if (!(target instanceof Element)) {
        return;
      }

      const interactiveElement = target.closest(
        "a, button, [role='button'], summary, [data-cursor]"
      );

      const themedElement = target.closest(
        "[data-cursor-theme]"
      );

      setHovering(Boolean(interactiveElement));

      setLabel(
        interactiveElement?.getAttribute("data-cursor") ?? ""
      );

      /*
       * First use an explicit data-cursor-theme.
       *
       * The #home fallback guarantees that the cursor
       * becomes white inside your Home section even if
       * you forgot to add the data attribute.
       */
      let requestedTheme =
        themedElement?.getAttribute("data-cursor-theme");

      if (!requestedTheme && target.closest("#home")) {
        requestedTheme = "light";
      }

      const isValidTheme =
        requestedTheme &&
        Object.prototype.hasOwnProperty.call(
          cursorThemes,
          requestedTheme
        );

      setCursorTheme(isValidTheme ? requestedTheme : "dark");
    };

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;

      lastPointerPosition.current = {
        x: clientX,
        y: clientY,
      };

      mouseX.set(clientX);
      mouseY.set(clientY);

      setVisible(true);

      updateCursorTarget(clientX, clientY);
    };

    /*
     * Recheck the element under the pointer when scrolling.
     *
     * Without this, the page can scroll into a new section
     * while the cursor remains on the old colour.
     */
    const handlePageChange = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const { x, y } = lastPointerPosition.current;

        if (x >= 0 && y >= 0) {
          updateCursorTarget(x, y);
        }
      });
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setHovering(false);
      setLabel("");
    };

    const handlePointerEnter = () => {
      setVisible(true);

      const { x, y } = lastPointerPosition.current;

      if (x >= 0 && y >= 0) {
        updateCursorTarget(x, y);
      }
    };

    const handlePointerDown = () => {
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handleWindowBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("scroll", handlePageChange, {
      passive: true,
    });

    window.addEventListener("resize", handlePageChange);

    window.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    window.addEventListener("blur", handleWindowBlur);

    document.documentElement.addEventListener(
      "mouseleave",
      handlePointerLeave
    );

    document.documentElement.addEventListener(
      "mouseenter",
      handlePointerEnter
    );

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "scroll",
        handlePageChange
      );

      window.removeEventListener(
        "resize",
        handlePageChange
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      window.removeEventListener(
        "blur",
        handleWindowBlur
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        handlePointerEnter
      );
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999]"
      style={{
        x: ringX,
        y: ringY,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{
        opacity: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
    >
      {/* Trailing ring */}
      <motion.div
        className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        initial={false}
        animate={{
          width: hovering ? 50 : 34,
          height: hovering ? 50 : 34,
          scale: pressed ? 0.85 : 1,

          backgroundColor: hovering
            ? theme.hoverBackground
            : theme.background,

          borderColor: theme.ring,
        }}
        transition={{
          width: {
            type: "spring",
            stiffness: 400,
            damping: 28,
          },

          height: {
            type: "spring",
            stiffness: 400,
            damping: 28,
          },

          scale: {
            type: "spring",
            stiffness: 400,
            damping: 28,
          },

          backgroundColor: {
            duration: 0.3,
            ease: "easeOut",
          },

          borderColor: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        {/* Small cursor dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10"
          style={{
            x: dotOffsetX,
            y: dotOffsetY,
          }}
          animate={{
            scale: pressed ? 0.7 : 1,
            opacity: label && hovering ? 0 : 1,
          }}
          transition={{
            scale: {
              duration: 0.15,
            },

            opacity: {
              duration: 0.18,
            },
          }}
        >
          <motion.div
            className="h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={false}
            animate={{
              backgroundColor: theme.dot,
              boxShadow: `0 0 0px ${theme.dot}`,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Optional cursor label */}
        <AnimatePresence mode="wait">
          {label && hovering && (
            <motion.span
              key={`${label}-${cursorTheme}`}
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                color: theme.text,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{
                duration: 0.18,
              }}
              className="relative z-20 max-w-[60px] text-center font-body text-[11px] font-semibold uppercase leading-tight tracking-[0.08em]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}