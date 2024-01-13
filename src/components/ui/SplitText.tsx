"use client";

import SplitType from "split-type";

import s from "@/styles/components/splitType.module.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const SplitText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const textWrapper = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!textWrapper.current) return;

    const _t = new SplitType(textWrapper.current, {
      types: "lines,words",
      lineClass: s.line,
      wordClass: s.word,
    });

    gsap.to(_t.words, {
      y: "0%",
      stagger: { amount: 0.33 },
      ease: "power3.out",
      duration: 1,
      scrollTrigger: {
        trigger: textWrapper.current,
        start: `top top+=90%`,
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={textWrapper} className={`${s.wrapper} ${className || ""}`}>
      {text}
    </div>
  );
};

export default SplitText;
