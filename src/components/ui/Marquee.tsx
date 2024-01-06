"use client";

import s from "@/styles/components/marquee.module.scss";
import { clamp } from "@/utils/math";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Marquee = ({
  text,
  className,
  direction = "left",
}: {
  text: string;
  className?: string;
  direction?: "left" | "right";
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const el = marqueeRef.current.querySelectorAll("span");
    const amt = window.innerWidth / 2;
    const left =
      marqueeRef.current.getBoundingClientRect().width / 2 - window.innerWidth;

    const SKEW = gsap.quickSetter(marqueeRef.current, "skewX", "deg");
    const cache = { skew: 0 };

    const dir = direction === "left" ? -1 : 1;

    gsap.to([el], {
      startAt: { x: dir > 0 ? -left : 0 },
      x: dir > 0 ? -left + amt : -amt,
      ease: "none",
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top bottom+=100",
        end: "bottom top-=100",
        scrub: true,
        onUpdate: (e) => {
          const skew = clamp(e.getVelocity() / -300, -20, 20);
          if (Math.abs(skew) > Math.abs(cache.skew)) {
            cache.skew = skew;
            gsap.to(cache, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => SKEW(cache.skew * dir),
            });
          }
        },
      },
    });
  }, [direction]);

  return (
    <div ref={marqueeRef} className={`${s.wrapper} ${className || ""}`}>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
    </div>
  );
};

export default Marquee;
