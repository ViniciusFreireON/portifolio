import { useEffect } from "react";

export function useFloatingAnimation(refs) {
  useEffect(() => {
    let frameId;
    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      refs.forEach((el) => {
        if (!el.current) return;
        const speed = 0.0003;
        const amplitude = 10;
        const y = Math.sin(elapsed * speed * 2 * Math.PI) * amplitude;
        const x = Math.cos(elapsed * speed * 1.5 * Math.PI) * (amplitude / 3);

        el.current.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(
          2
        )}px)`;
      });

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [refs]);
}
