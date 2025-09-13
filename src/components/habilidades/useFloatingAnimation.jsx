import { useEffect, useRef } from "react";

export function useFloatingAnimation() {
  const refs = useRef([]);

  useEffect(() => {
    let frameId;
    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      refs.current.forEach((el) => {
        if (!el) return;
        const speed = 0.0003;
        const amplitude = 10;
        const y = Math.sin(elapsed * speed * 2 * Math.PI) * amplitude;
        const x = Math.cos(elapsed * speed * 1.5 * Math.PI) * (amplitude / 3);
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      });

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return refs;
}
