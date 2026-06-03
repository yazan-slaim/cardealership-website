"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function RouteTransitionWatcher() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Scroll to top immediately on route change
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger and resize Lenis after DOM has settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (lenis) {
        lenis.resize();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}
