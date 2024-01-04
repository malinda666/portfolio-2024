import React from "react";

import s from "@/styles/views/about.module.scss";
import Image from "next/image";
import ParallaxImage from "../ui/ParallaxImage";
import image from "../../../public/assets/images/abstract-1.jpg";

const About = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.inner}>
        <ParallaxImage src={image} className={s.about__image} />
        {/* <div className={s.about__image}>
          <Image src="/assets/images/abstract-1.jpg" alt="About Image" fill />
        </div> */}
        <div className={s.top}>
          <span className={s.about__title}>
            Crafts exceptional websites tailored to your brand, blending
            cutting-edge tech with user-centric design. Elevate your online
            presence.
          </span>
          <div className={s.about__description}>
            <p>
              {`I'm a self-taught React.js frontend developer with over 3 years of experience. I specialize in crafting intuitive, responsive, and high-performance interfaces using React.js, Next.js, and AWS services like Amplify, Cognito, and S3.`}
            </p>
            <p>
              {`My expertise also includes HTML, CSS, and Tailwind CSS for effective styling. I'm passionate about creating exceptional web experiences with a user-centric focus.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
