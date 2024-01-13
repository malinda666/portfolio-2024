import React from "react";

import s from "@/styles/views/about.module.scss";
import ParallaxImage from "../ui/ParallaxImage";
import image from "../../../public/assets/images/profile.jpg";
import SectionWrapper from "../ui/SectionWrapper";
import Marquee from "../ui/Marquee";
import SplitText from "../ui/SplitText";

const About = () => {
  return (
    <SectionWrapper>
      <Marquee text="frontend" direction="right" />
      <Marquee text="developer" direction="left" />
      <div className={s.inner}>
        <div className={s.heading}>&mdash; about</div>
        <SplitText
          text=" Crafts exceptional websites tailored to your brand, blending
          cutting-edge tech with user-centric design. Elevate your online
          presence."
          className={s.about__title}
        />

        <div className={s.about__description}>
          <SplitText text="As a self-taught React.js frontend developer with over 3 years of experience, I specialize in crafting intuitive, responsive, and high-performance interfaces using React.js, Next.js, and AWS services like Amplify, Cognito, and S3." />
          <SplitText text="My expertise also includes HTML, CSS, and Tailwind CSS for effective styling. I'm passionate about creating exceptional web experiences with a user-centric focus." />
        </div>
        <ParallaxImage src={image} className={s.about__image} />
      </div>
    </SectionWrapper>
  );
};

export default About;
