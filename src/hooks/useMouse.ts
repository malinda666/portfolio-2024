import { clamp } from "@/utils/math";
import { useEffect, useState } from "react";

export default function useMouse() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });
  const [mouseCache, setMouseCache] = useState({
    x: mouse.x,
    y: mouse.y,
  });
  const [mouseDirection, setMouseDirection] = useState({
    x: mouseCache.x - mouse.x,
    y: mouseCache.y - mouse.y,
  });

  useEffect(() => {
    window.addEventListener("mousemove", getMousePos);
    return () => {
      window.removeEventListener("mousemove", getMousePos);
    };
  }, []);

  const getMousePos = (e: MouseEvent) => {
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    setMouse({ x: posx, y: posy });
    setMouseDirection({ x: mouseCache.x - mouse.x, y: mouseCache.y - mouse.y });
    setMouseCache({
      x: posx,
      y: posy,
    });
  };

  return {
    mouse,
    cache: mouseCache,
    direction: mouseDirection,
  };
}
