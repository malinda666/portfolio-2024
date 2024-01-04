"use client";

import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";
import React, {
  MouseEventHandler,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

import s from "@/styles/views/works.module.scss";
import gsap from "gsap";
import Arrow from "@/components/ui/Arrow";
import { getRandomNumber, map } from "@/utils/math";

const Project = ({ project }: { project: any }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const w = wrapperRef.current;
    const thumbWrapper = document.querySelector("#thumbs");
    if (!thumbWrapper) return;
    const thumb = thumbWrapper.querySelector(`[data-project="${project.id}"]`);
    const thumbs = thumb?.querySelectorAll("div");
    const thumbImages = thumb?.querySelectorAll("div > img");
    const xStart = getRandomNumber(15, 60);
    const yStart = getRandomNumber(15, 60);

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
    });

    const X = gsap.quickTo(thumbWrapper, "x", {
      duration: 1,
      ease: "expo.out",
    });
    const Y = gsap.quickTo(thumbWrapper, "y", {
      duration: 1,
      ease: "expo.out",
    });
    const rotation = gsap.quickTo(thumbWrapper, "rotate", {
      duration: 1,
      ease: "expo.out",
    });

    const onMouseLeave = (e: MouseEvent) => {
      if (!thumb) return;

      X(0);
      Y(0);
      rotation(0);
      // O(0);
      gsap
        .timeline()
        .to([thumbs], {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 0.6,
        })
        .to([thumbImages], { scale: 1.4 }, 0);
    };

    const onMouseEnter = (e: MouseEvent) => {};

    const onMouseMove = (e: MouseEvent) => {
      if (!thumb || !thumbWrapper) return;
      const { clientX, clientY } = e;
      const { left, top, height, width } = thumbWrapper.getBoundingClientRect();
      const x = map(clientX, 0, width, -xStart, xStart);
      const y = map(clientY, 0, height, -yStart, yStart);
      const rotate = map(clientY, 0, height, -yStart, xStart);

      X(x);
      Y(y);
      // rotation(rotate);
      // O(1);
      // C(0);
      gsap
        .timeline()
        .to([thumbs], {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
        })
        .to([thumbImages], { scale: 1 }, 0);
    };

    w.addEventListener("mouseleave", onMouseLeave);
    w.addEventListener("mouseenter", onMouseEnter);
    w.addEventListener("mousemove", onMouseMove);
    return () => {
      w.removeEventListener("mouseleave", onMouseLeave);
      w.removeEventListener("mousemove", onMouseMove);
      w.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      className={s.project}
      key={project.id}
      ref={wrapperRef}
      data-project={project.id}
    >
      {/* <CustomLink text={project.title} className={s.project__title} /> */}
      <div className={`${s.project__title}`}>
        <span className={s.project__title___arrow}>
          <Arrow />
        </span>
        <div className={s.project__title___text___wrapper}>
          <span className={s.title}>{project.title}</span>
          <span className={s.title}>{project.title}</span>
        </div>
        <div className={s.project__title___project__tags}>
          {project.tags?.map((tag: string) => (
            <span className={s.project__title___project__tags___tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* <div className={s.project__image} id="thumb">
        <Image src={project.img_1} alt={project.title} fill />
      </div> */}
    </div>
  );
};

export default Project;
