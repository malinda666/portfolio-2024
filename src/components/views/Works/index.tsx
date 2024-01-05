"use client";

import React, { useRef } from "react";

import s from "@/styles/views/works.module.scss";
import { projects } from "@/data";
import Project from "./Project";
import Image from "next/image";

const Works = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (!wrapperRef.current || !pinRef.current) return;

  //     const pb = window.innerHeight;

  //     const ctx = gsap.context(() => {
  //       const tl = gsap.timeline({
  //         paused: true,
  //         scrollTrigger: {
  //           trigger: wrapperRef.current,
  //           start: "top top",
  //           end: `bottom center`,
  //           scrub: true,
  //           pin: pinRef.current,
  //         },
  //       });
  //     }, wrapperRef);

  //     return () => ctx.revert();
  //   }, []);

  return (
    <section>
      <div className={s.wrapper} ref={wrapperRef}>
        <div className={s.inner}>
          <div className={s.heading}>&mdash; selected projects</div>
          <div className={s.projects}>
            {projects.map((project) => (
              <Project project={project} key={project.id} />
            ))}
          </div>
          {/* <div className={s.projects__images} id="thumbs">
            {projects.map((project) => (
              <div
                className={s.project__images___inner}
                key={project.id}
                data-project={project.id}
              >
                <div className={s.project__image} id="thumb1">
                  <Image src={project.img_1} alt={project.title} fill />
                </div>
                
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Works;
