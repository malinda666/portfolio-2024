"use client";

import React, { ReactNode } from "react";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const MainLayout = ({ children }: { children: ReactNode }) => {
  useSmoothScroll();

  return <main>{children}</main>;
};

export default MainLayout;
