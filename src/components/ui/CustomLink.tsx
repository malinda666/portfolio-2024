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
    <div className={`${s.wrapper} ${className ? className : ""}`}>
      <div className={s.arrows}>
        <span className={`${s.arrow}`}>
          <Arrow />
        </span>
      </div>
      <div className={s.text__wrapper}>
        <span className={s.text}>{text}</span>
        <span className={s.text}>{text}</span>
      </div>
    </div>
  );
};

export default CustomLink;
