// src/components/habilidades/Habilidades.jsx

import React, { useEffect, useState, useRef } from "react";
import { useFloatingAnimation } from "/src/components/habilidades/useFloatingAnimation";
import TypingText from "/src/components/habilidades/TypingText";

import bgGradiente from "/assets/bggradiente.jpg";
import javascriptLogo from "../assets/Unofficial_JavaScript_logo_2.png";
import pythonLogo from "../assets/python.png";
import css3Logo from "../assets/css3.jpg";
import html5Logo from "../assets/html5.png";

const Habilidades = () => {
  const floatingRefs = useFloatingAnimation(4);
  const sectionRef = useRef(null);
  const [fadeInVisible, setFadeInVisible] = useState(false);

  const [frontEndProgress, setFrontEndProgress] = useState(new Array(4).fill(0));
  const [backEndProgress, setBackEndProgress] = useState(new Array(4).fill(0));
  const [ferramentasProgress, setFerramentasProgress] = useState(new Array(4).fill(0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeInVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const frontEndSkills = [
    { name: "HTML e CSS", percent: 90 },
    { name: "JavaScript", percent: 75 },
    { name: "React", percent: 60 },
    { name: "Tailwind CSS", percent: 80 },
  ];

  const backEndSkills = [
    { name: "Python", percent: 75 },
    { name: "PHP", percent: 75 },
    { name: "Node.js", percent: 60 },
    { name: "SQL e SQLite", percent: 60 },
  ];

  const ferramentas = [
    { name: "Git", percent: 80 },
    { name: "GitHub", percent: 95 },
    { name: "VsCode", percent: 100 },
    { name: "Figma", percent: 100 },
  ];

  useEffect(() => {
    if (!fadeInVisible) return;

    const animateProgress = (skills, setProgress) => {
      skills.forEach(({ percent }, i) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 1.2;
          setProgress((old) => {
            const newProgress = [...old];
            newProgress[i] =
              progress > percent ? percent : Math.round(progress);
            return newProgress;
          });
          if (progress >= percent) clearInterval(interval);
        }, 15);
      });
    };

    animateProgress(frontEndSkills, setFrontEndProgress);
    animateProgress(backEndSkills, setBackEndProgress);
    animateProgress(ferramentas, setFerramentasProgress);
  }, [fadeInVisible]);

  const images = [
    { src: javascriptLogo, alt: "JavaScript", style: "top-[38em] left-[90em] opacity-20" },
    { src: pythonLogo, alt: "Python", style: "top-[5em] left-[65em] opacity-20" },
    { src: css3Logo, alt: "CSS3", style: "top-[13em] left-[20em] opacity-50" },
    { src: html5Logo, alt: "HTML5", style: "top-[35em] left-[7em] opacity-20" },
  ];

  const fadeBaseClass = "transition-opacity duration-1000 ease-out transform";

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      className="min-h-[140vh] p-16 text-white bg-gradient-to-b from-[#131212] to-[#1F1E1E] relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgGradiente})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* DECORAÇÕES */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {images.map((img, index) => (
          <div
            key={index}
            ref={(el) => (floatingRefs.current[index] = el)}
            className={`decorative-image w-[200px] h-[200px] overflow-hidden rounded-lg absolute ${img.style} drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover blur-[1px]" />
          </div>
        ))}
      </div>

      {/* TÍTULO E SUBTÍTULO CENTRALIZADOS */}
      <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
        {/* Título */}
        <div
          className={`${fadeBaseClass} ${
            fadeInVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-8xl font-poppins font-normal">
            Minhas{" "}
            <span className="font-prata font-normal text-[#F3AD4C]">Habilidades.</span>
          </h2>
        </div>

        {/* Subtítulo centralizado */}
        <div
  className={`${fadeBaseClass} ${
    fadeInVisible
      ? "opacity-100 translate-y-0 delay-200"
      : "opacity-0 translate-y-10"
  } mt-4 w-full flex flex-col items-center relative -top-[6.5em] -left-[13.5em]`}
>
  <TypingText
    text="Coisas que aprendi entre <strong>cafés</strong> e <strong>madrugadas</strong>."
    speed={50}
    className="text-xl font-light mt-2 max-w-[600px] text-center px-4"
  />
</div>

      </div>

      {/* CAIXAS DE HABILIDADES */}
      <div className="habilidades-grid mt-10 px-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* FRONT-END */}
        <div
          className={`habilidade-card ${fadeBaseClass} ${
            fadeInVisible ? "opacity-100 translate-y-0 delay-[400ms]" : "opacity-0 translate-y-10"
          } bg-[#141414] rounded-lg shadow-lg p-8 drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)] border border-white/20`}
        >
          <h3 className="flex items-center text-xl font-normal font-jakarta tracking-[0.1em] mb-6">
            <span className="inline-block w-3 h-1.5 mr-3 rounded-sm bg-blue-600"></span>
            Front-End
          </h3>
          {frontEndSkills.map((skill, index) => (
            <div key={skill.name} className="mb-5">
              <div className="flex justify-between text-base mb-2">
                <span className="font-jakarta tracking-[0.1em]">{skill.name}</span>
                <span className="font-jakarta tracking-[0.1em]">{frontEndProgress[index]}%</span>
              </div>
              <div className="w-full bg-gray-700 habilidade-barra h-2.5 rounded-full">
                <div
                  className="bg-white h-2.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${frontEndProgress[index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* BACK-END */}
        <div
          className={`habilidade-card ${fadeBaseClass} ${
            fadeInVisible ? "opacity-100 translate-y-0 delay-[600ms]" : "opacity-0 translate-y-10"
          } bg-[#141414] rounded-lg shadow-lg p-8 drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)] border border-white/20`}
        >
          <h3 className="flex items-center text-xl font-normal font-jakarta tracking-[0.1em] mb-6">
            <span className="inline-block w-3 h-1.5 mr-3 rounded-sm bg-purple-600"></span>
            Back-End
          </h3>
          {backEndSkills.map((skill, index) => (
            <div key={skill.name} className="mb-5">
              <div className="flex justify-between text-base mb-2">
                <span className="font-jakarta tracking-[0.1em]">{skill.name}</span>
                <span className="font-jakarta tracking-[0.1em]">{backEndProgress[index]}%</span>
              </div>
              <div className="w-full bg-gray-700 habilidade-barra h-2.5 rounded-full">
                <div
                  className="bg-white h-2.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${backEndProgress[index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* FERRAMENTAS */}
        <div
          className={`habilidade-card ${fadeBaseClass} ${
            fadeInVisible ? "opacity-100 translate-y-0 delay-[800ms]" : "opacity-0 translate-y-10"
          } bg-[#141414] rounded-lg shadow-lg p-8 drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)] border border-white/20`}
        >
          <h3 className="flex items-center text-xl font-normal font-jakarta tracking-[0.1em] mb-6">
            <span className="inline-block w-3 h-1.5 mr-3 rounded-sm bg-orange-500"></span>
            Ferramentas
          </h3>
          {ferramentas.map((skill, index) => (
            <div key={skill.name} className="mb-5">
              <div className="flex justify-between text-base mb-2">
                <span className="font-jakarta tracking-[0.1em]">{skill.name}</span>
                <span className="font-jakarta tracking-[0.1em]">{ferramentasProgress[index]}%</span>
              </div>
              <div className="w-full bg-gray-700 habilidade-barra h-2.5 rounded-full">
                <div
                  className="bg-white h-2.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${ferramentasProgress[index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTÃO DE CURRÍCULO */}
      <div
        className={`flex justify-center mt-32 relative z-10 ${fadeBaseClass} ${
          fadeInVisible ? "opacity-100 translate-y-0 delay-[1000ms]" : "opacity-0 translate-y-10"
        }`}
      >
        <a
          href="https://drive.google.com/uc?export=download&id=1oapSf9tZ3Z2FZHw_odRatf2gmoVdIhNS"
          className="botao-curriculo font-poppins bg-gradient-to-b from-[#0A0B0C] to-[#171717] text-white text-[1.2em] px-10 py-4 hover:scale-105 transition-all duration-300 ease-in-out drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] rounded-[1em] border border-white/20 tracking-[0.1em] font-light"
        >
          Baixar Curriculum
        </a>
      </div>
    </section>
  );
};

export default Habilidades;
