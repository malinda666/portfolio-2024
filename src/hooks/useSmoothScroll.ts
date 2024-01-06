"use client";

import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { use, useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>();

  const reqIDRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  useEffect(() => {
    const animate = (time: DOMHighResTimeStamp) => {
      lenis?.raf(time);
      lenis?.on("scroll", () => ScrollTrigger.update());
      reqIDRef.current = requestAnimationFrame(animate);
    };

    reqIDRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqIDRef.current as number);
  }, [lenis]);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      //   duration: 2,
      // orientation: "vertical",
      // gestureOrientation: "vertical",
      // smoothWheel: true,
      // smoothTouch: false,
      // touchMultiplier: 2,
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}
