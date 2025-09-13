// src/components/ScrollSection.js

import React from "react";
import useScrollMove from "../hooks/useScrollMove";

const ScrollSection = ({ children }) => {
  const { sectionRef } = useScrollMove();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen p-0 overflow-x-hidden"
      style={{
        position: "relative",
        willChange: "transform",
      }}
    >
      {children}
    </section>
  );
};

export default ScrollSection;
