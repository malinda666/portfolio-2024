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
    const container = document.querySelector("#projects");
    if (!thumbRef.current || !wrapperRef.current || !container) return;

    const w = wrapperRef.current;
    const thumbImage = thumbRef.current.querySelector("#thumb > img");

    const projects = container.querySelectorAll("#project");

    const thumbBounds = thumbRef.current.getBoundingClientRect();
    const wrapperBounds = wrapperRef.current.getBoundingClientRect();
    const containerBounds = container.getBoundingClientRect();
    let mouse = { x: 0, y: 0 };
    let mousePosCache = mouse;

    const updateMouse = (ev: MouseEvent) => {
      w.setAttribute("active", "true");
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
      const ty = Math.abs(mouse.y - wrapperBounds.top) - thumbBounds.height / 2;
      // new rotation value
      const tr = map(mouseDistanceX, 0, 500, 0, direction.x < 0 ? 9 : -9);

      const x = map(tx, 0, wrapperBounds.width, -150, 150);
      const y = map(ty, 0, -thumbBounds.height / 2, -10, 10);

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .set(
          thumbRef.current,
          {
            //  zIndex: 6,
            transformStyle: "preserve-3d",
          },
          0
        )
        .set(projects, { zIndex: -1 }, 0)
        .set(w, { zIndex: 2 }, 0)

        .to(
          thumbRef.current,
          {
            clipPath: "inset(0% round 0.25rem)",
            scale: 1,
            opacity: 1,
          },
          0
        )
        .to(thumbImage, { scale: 1 }, 0)
        .to(
          thumbRef.current,
          {
            x,
            y: (thumbBounds.height / 2) * -1,
            rotation: tr,
          },
          0
        );
    };

    const onMouseLeave = () => {
      if (!thumbRef.current) return;
      w.setAttribute("active", "false");

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .set(thumbRef.current, { zIndex: -1 }, 0)
        .set(projects, { zIndex: 1 }, 0)
        .to(
          [thumbRef.current],
          {
            clipPath: "inset(20% round 1.25rem)",
            scale: 0.6,
            opacity: 0,
          },
          0
        )
        .to([thumbImage], { scale: 1.4 }, 0);
    };

    w.addEventListener("mousemove", (ev) => updateMouse(ev));
    w.addEventListener("mouseleave", onMouseLeave);
    return () => {
      w.removeEventListener("mousemove", (ev) => updateMouse(ev));
      w.removeEventListener("mouseleave", onMouseLeave);
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
        <div className={s.project__title__tags}>
          {project.tags?.map((tag: string) => (
            <span className={s.project__title__tags___tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={s.project__title__tags__temp}>
          {project.tags?.map((tag: string) => (
            <span className={s.project__title__tags__temp___tag} key={tag}>
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
