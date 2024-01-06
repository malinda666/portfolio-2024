"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

import s from "@/styles/views/works.module.scss";
import gsap from "gsap";
import Arrow from "@/components/ui/Arrow";
import { getMousePos } from "@/utils/misc";
import { clamp, getRandomNumber, map } from "@/utils/math";

const Project = ({ project }: { project: any }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbRef.current || !wrapperRef.current) return;

    const thumbBounds = thumbRef.current.getBoundingClientRect();
    const wrapperBounds = wrapperRef.current.getBoundingClientRect();
    let mouse = { x: 0, y: 0 };
    let mousePosCache = mouse;

    const updateMouse = (ev: MouseEvent) => {
      mouse = getMousePos(ev);
      // cache the mouse position
      const direction = {
        x: mousePosCache.x - mouse.x,
        y: mousePosCache.y - mouse.y,
      };

      const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mouse.x), 0, 100);
      // direction where the mouse is moving
      // updated cache values
      mousePosCache = { x: mouse.x, y: mouse.y };

      // new translation values
      const tx = Math.abs(mouse.x - wrapperBounds.left) - thumbBounds.width / 2;
      const ty = Math.abs(mouse.y - thumbBounds.top) - window.innerHeight / 2;
      // new rotation value
      const tr = map(mouseDistanceX, 0, 300, 0, direction.x < 0 ? 60 : -60);

      const x = map(tx, 0, wrapperBounds.width, -100, 100);
      const y = map(ty, 0, -wrapperBounds.height, -5, 5);

      gsap.to(thumbRef.current, {
        x,
        y,
        rotateX: tr,
      });
    };

    window.addEventListener("mousemove", (ev) => updateMouse(ev));
    return () => {
      window.removeEventListener("mousemove", (ev) => updateMouse(ev));
    };
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const w = wrapperRef.current;
    const thumbWrapper = thumbRef.current;
    w.setAttribute("active", "false");

    const thumbImage = thumbWrapper?.querySelector("#thumb > img");

    const onMouseLeave = () => {
      if (!thumbWrapper) return;
      w.setAttribute("active", "false");

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .set(thumbWrapper, { zIndex: -2 }, 0)
        .to(
          [thumbWrapper],
          {
            clipPath: "inset(20% round 1.25rem)",
            scale: 0.6,
            opacity: 0,
          },
          0
        )
        .to([thumbImage], { scale: 1.4 }, 0);
    };

    const onMouseEnter = () => {
      if (!w || !thumbWrapper || !thumbImage) return;
      w.setAttribute("active", "true");

      // rotation(rotate);
      // O(1);
      // C(0);
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .set(thumbWrapper, { zIndex: 5 }, 0)
        .to(
          thumbWrapper,
          {
            opacity: 1,
            duration: 0.45,
          },
          0
        )
        .to(
          thumbWrapper,
          {
            clipPath: "inset(0% round 0.25rem)",
            scale: 1,
            opacity: 1,
          },
          0
        )
        .to(thumbImage, { scale: 1 }, 0);
    };

    w.addEventListener("mouseleave", onMouseLeave);
    w.addEventListener("mouseenter", onMouseEnter);
    return () => {
      w.removeEventListener("mouseleave", onMouseLeave);
      w.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      className={s.project}
      key={project.id}
      ref={wrapperRef}
      data-project={project.id}
      id="project"
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

      <div className={s.project__image} id="thumb" ref={thumbRef}>
        <Image src={project.img_1} alt={project.title} fill />
      </div>
    </div>
  );
};

export default Project;
