import React from "react";

import image from "../../../public/assets/images/abstract-1.jpg";

import s from "@/styles/views/hero.module.scss";
import Image from "next/image";
import ParallaxImage from "../ui/ParallaxImage";

const Hero = () => {
  return (
    <section>
      <div className={s.wrapper}>
        <h1 className={s.title}>
          <div className={s.title__inner}>
            <span className={s.title__inner___item}>Unlock</span>
          </div>
          <div className={s.title__inner}>
            <span className={s.title__inner___item}>Your</span>
          </div>
          {/* <div className={s.title__inner}></div> */}
          <div className={s.title__inner}>
            <span className={s.title__inner___item}>Digital&nbsp;</span>
            <span className={s.title__inner___item}>Potential</span>
          </div>
        </h1>
        <div className={s.description}>
          <p className={s.description__paragraph}>
            <span className={s.description__paragraph___inner}>
              Elevating brands with tailored web development
            </span>
            <span className={s.description__paragraph___inner}>
              where innovation, design, and performance converge seamlessly.
            </span>
          </p>
          <ParallaxImage src={image} className={s.description__bg} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
