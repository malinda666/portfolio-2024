import React from "react";

import s from "@/styles/views/works.module.scss";
import { projects } from "@/data";
import Project from "./Project";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Marquee from "@/components/ui/Marquee";

const Works = () => {
  return (
    <>
      <SectionWrapper>
        <Marquee text="Selected works" />
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.heading}>&mdash; selected projects</div>
            <div className={s.projects}>
              {projects.map((project) => (
                <Project project={project} key={project.id} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Works;
