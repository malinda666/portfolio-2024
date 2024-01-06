import React, { ReactNode } from "react";

import s from "@/styles/components/section.module.scss";

const SectionWrapper = ({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "full" | "default";
}) => {
  return (
    <section className={`${s.wrapper} ${variant === "full" ? s.full : ""}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
