import React from "react";
import Arrow from "./Arrow";

import s from "@/styles/components/link.module.scss";

const CustomLink = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <span className={s.text}>{text}</span>
      <div className={s.arrows}>
        <span className={`${s.arrow} ${s.upper}`}>
          <Arrow />
        </span>
        <span className={`${s.arrow} ${s.lower}`}>
          <Arrow />
        </span>
      </div>
    </div>
  );
};

export default CustomLink;
