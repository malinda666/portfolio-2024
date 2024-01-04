"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import s from "@/styles/components/parallax.module.scss";

const ParallaxImage = ({
  src,
  className,
  alt,
}: {
  src: StaticImport | string;
  className: string;
  alt?: string;
}) => {
  const imageWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!imageWrapper.current) return;
    const imageInner = imageWrapper.current.querySelector("img");

    if (!imageInner) return;

    const { height: wrapperHeight } =
      imageWrapper.current.getBoundingClientRect();
    const { height: innerHeight } = imageInner.getBoundingClientRect();
    const dist = innerHeight - wrapperHeight;

    gsap.to(imageInner, {
      y: dist * 0.5,
      ease: "none",
      duration: 1.25,
      scrollTrigger: {
        trigger: imageWrapper.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className={`${s.wrapper} ${className}`} ref={imageWrapper}>
      <Image src={src} alt={alt || "Abstract Image"} fill />
    </div>
  );
};

export default ParallaxImage;
