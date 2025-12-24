import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export function onPageEnter(containerRef, parent) {
  gsap.to(window, { duration: 1, scrollTo: { y: 0 } }).then(() => {
    gsap.set(containerRef.current, {
      position: "fixed",
      top: "100vh",
      zIndex: "2",
      marginTop: 0,
    });

    gsap.to(containerRef.current, {
      top: 0,
      duration: 2.5,
      ease: "power4.inOut",
      onStart: () => {},
      onComplete: () => {
        containerRef.current.style.position = "relative";
        Array.from(parent.children).forEach((child) => {
          if (child !== containerRef.current) {
            console.log("Attempting to remove:", child); // Add logging for debugging
            if (parent.contains(child)) {
              try {
                gsap.set(child, { marginTop: "0px", zIndex: "1" });
                parent.removeChild(child);
                console.log("Removed:", child); // Log after removal
              } catch (error) {
                console.error("Error removing child:", error, child); // Catch and log error
              }
            } else {
              console.log("Child is no longer part of the parent:", child);
            }
          }
        });

        ScrollTrigger.refresh();
      },
    });
  });
}

export function onPageLeave(containerRef) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.backgroundColor = "rgba(0, 0, 0, 1)";
    overlay.style.opacity = 0;
    overlay.style.zIndex = 9999;
    overlay.style.pointerEvents = "none";
    containerRef.current.appendChild(overlay);

    gsap.to(overlay, {
      opacity: 1,
      delay: 1,
      duration: 2.5,
      ease: "power2.inOut",
      onComplete: resolve, // 👈 resolves automatically when done
    });

    gsap.to(containerRef.current, {
      marginTop: "-150px",
      delay: 1,
      duration: 2.5,
      ease: "power4.inOut",
    });
  });
}
