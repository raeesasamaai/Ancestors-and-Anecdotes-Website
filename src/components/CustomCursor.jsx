
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* =====================================================
   ORIGINAL CURSOR THEMES
   NO COLOUR CHANGES
===================================================== */

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
  /* =====================================================
     POSITION VALUES

     The ring follows using springs.
     The dot follows the actual pointer.
  ===================================================== */

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

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

  const dotOffsetX = useTransform(
    () => mouseX.get() - ringX.get()
  );

  const dotOffsetY = useTransform(
    () => mouseY.get() - ringY.get()
  );

  /* =====================================================
     STATE AND REFERENCES
  ===================================================== */

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");
  const [cursorTheme, setCursorTheme] =
    useState("dark");

  const lastPointerPosition = useRef({
    x: -100,
    y: -100,
  });

  const animationFrameRef = useRef(null);
  const hasMovedRef = useRef(false);

  const theme =
    cursorThemes[cursorTheme] ??
    cursorThemes.dark;

  /* =====================================================
     ACTIVATE NATIVE CURSOR HIDING ONLY WHEN VISIBLE
  ===================================================== */

  useEffect(() => {
    document.documentElement.classList.toggle(
      "custom-cursor-active",
      visible
    );

    return () => {
      document.documentElement.classList.remove(
        "custom-cursor-active"
      );
    };
  }, [visible]);

  /* =====================================================
     POINTER TRACKING

     IMPORTANT CHANGE:

     We do NOT rely on matchMedia to render the
     custom cursor.

     Instead, we show it when actual mouse input
     occurs.

     Trackpads report pointerType="mouse".
  ===================================================== */

  useEffect(() => {
    /* -----------------------------------------
       DETECT THE CURRENT THEME AND HOVER TARGET
    ----------------------------------------- */

    const updateCursorTarget = (x, y) => {
      const target = document.elementFromPoint(x, y);

      if (!(target instanceof Element)) {
        setHovering(false);
        setLabel("");
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
        interactiveElement?.getAttribute(
          "data-cursor"
        ) ?? ""
      );

      
      let requestedTheme =
        themedElement?.getAttribute(
          "data-cursor-theme"
        );

      // Keep the existing homepage colour behaviour.
      if (
        !requestedTheme &&
        target.closest("#home")
      ) {
        requestedTheme = "light";
      }

      // Override the cursor colour to WHITE
      // whenever it hovers over a button.
      const isButton = target.closest(
        "button, [role='button'], input[type='button'], input[type='submit']"
      );

      if (isButton) {
        requestedTheme = "light";
      }


      const isValidTheme =
        requestedTheme &&
        Object.prototype.hasOwnProperty.call(
          cursorThemes,
          requestedTheme
        );

      setCursorTheme(
        isValidTheme
          ? requestedTheme
          : "dark"
      );
    };

    /* -----------------------------------------
       MOUSE / TRACKPAD MOVEMENT
    ----------------------------------------- */

    const handlePointerMove = (event) => {
      // Touch and pen input do not activate
      // the custom cursor.
      if (event.pointerType !== "mouse") {
        setVisible(false);
        setPressed(false);
        setHovering(false);
        setLabel("");
        return;
      }

      const { clientX, clientY } = event;

      lastPointerPosition.current = {
        x: clientX,
        y: clientY,
      };

      mouseX.set(clientX);
      mouseY.set(clientY);

      // On the first movement, place the ring
      // at the pointer immediately rather than
      // animating from outside the screen.
      if (!hasMovedRef.current) {
        ringX.jump(clientX);
        ringY.jump(clientY);
        hasMovedRef.current = true;
      }

      setVisible(true);

      updateCursorTarget(
        clientX,
        clientY
      );
    };

    /* -----------------------------------------
       UPDATE THE THEME AFTER SCROLLING
    ----------------------------------------- */

    const handlePageChange = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      animationFrameRef.current =
        requestAnimationFrame(() => {
          animationFrameRef.current = null;

          const { x, y } =
            lastPointerPosition.current;

          if (x >= 0 && y >= 0) {
            updateCursorTarget(x, y);
          }
        });
    };

    /* -----------------------------------------
       POINTER LEAVES THE WINDOW
    ----------------------------------------- */

    const handlePointerLeave = (event) => {
      if (event.pointerType === "mouse") {
        setVisible(false);
        setHovering(false);
        setPressed(false);
        setLabel("");
      }
    };

    /* -----------------------------------------
       PRESS AND RELEASE
    ----------------------------------------- */

    const handlePointerDown = (event) => {
      if (event.pointerType === "mouse") {
        setPressed(true);
      }
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    /* -----------------------------------------
       WINDOW LOSES FOCUS
    ----------------------------------------- */

    const handleWindowBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    /* =====================================================
       EVENT LISTENERS
    ===================================================== */

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      handlePageChange,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handlePageChange
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    window.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    window.addEventListener(
      "blur",
      handleWindowBlur
    );

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
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
        "pointercancel",
        handlePointerUp
      );

      window.removeEventListener(
        "blur",
        handleWindowBlur
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, [
    mouseX,
    mouseY,
    ringX,
    ringY,
  ]);

  /* =====================================================
     CUSTOM CURSOR ELEMENT

     Always mounted, but invisible until the
     first mouse/trackpad movement.

     Touch-only devices never activate it.

     We position with left/top MotionValues
     and use a separate HTML element to center
     the ring. This avoids transform conflicts.
  ===================================================== */

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <motion.div
      data-custom-cursor="true"
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        z-[99999]
      "
      style={{
        left: ringX,
        top: ringY,
      }}
      initial={false}
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
      {/* POSITIONING WRAPPER */}
      <div
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* TRAILING RING */}
        <motion.div
          className="
            relative
            flex
            items-center
            justify-center
            rounded-full
            border
          "
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
          {/* ====================================
              CURSOR DOT

              Keep the dot at the true pointer
              position while the ring trails.
          ==================================== */}

          <motion.div
            className="
              absolute
              left-1/2
              top-1/2
              z-10
            "
            style={{
              x: dotOffsetX,
              y: dotOffsetY,
            }}
            animate={{
              scale: pressed ? 0.7 : 1,
              opacity:
                label && hovering ? 0 : 1,
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
            <div
              style={{
                transform:
                  "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="
                  h-[7px]
                  w-[7px]
                  rounded-full
                "
                initial={false}
                animate={{
                  backgroundColor: theme.dot,
                  boxShadow:
                    `0 0 0px ${theme.dot}`,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>

          {/* ====================================
              OPTIONAL HOVER LABEL
          ==================================== */}

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
                className="
                  relative
                  z-20
                  max-w-[60px]
                  text-center
                  font-body
                  text-[11px]
                  font-semibold
                  uppercase
                  leading-tight
                  tracking-[0.08em]
                "
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
}
