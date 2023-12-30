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

const Project = ({ project }: { project: any }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!wrapperRef.current) return;

    const w = wrapperRef.current;
    const thumb = w.querySelector("#thumb");
    const mouse = {
      x: 0,
      y: 0,
    };

    const onMouseEnter = (e: MouseEvent) => {
      w.classList.add("active");
      mouse.x = 0;
      mouse.y = 0;
      gsap.to(thumb, {
        opacity: 1,
      });
      //   const { clientX, clientY } = e;
      //   console.log(clientX, clientY);
    };

    const onMouseLeave = (e: MouseEvent) => {
      w.classList.remove("active");
      mouse.x = 0;
      mouse.y = 0;
      gsap.to(thumb, {
        x: 0,
        y: 0,
        opacity: 0,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!thumb) return;
      const { clientX, clientY } = e;
      const { height, width } = thumb.getBoundingClientRect();
      const x = (clientX - width) / 2;
      const y = (clientY - height) / 2;

      gsap.to(thumb, {
        x,
        y,
      });
    };

    w.addEventListener("mouseenter", onMouseEnter);
    w.addEventListener("mouseleave", onMouseLeave);
    w.addEventListener("mousemove", onMouseMove);
    return () => {
      w.removeEventListener("mouseenter", onMouseEnter);
      w.removeEventListener("mouseleave", onMouseLeave);
      w.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className={s.project} key={project.id} ref={wrapperRef}>
      <h3 className={s.project__title}>
        <CustomLink text={project.title} />
      </h3>
      <div className={s.project__image} id="thumb">
        <Image src={project.img_1} alt={project.title} fill />
      </div>
    </div>
  );
};

export default Project;
