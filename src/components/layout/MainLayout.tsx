"use client";

import React, { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const MainLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis();

    // lenis.on("scroll", (e: any) => {
    //   console.log(e);
    // });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <main>{children}</main>;
};

export default MainLayout;
