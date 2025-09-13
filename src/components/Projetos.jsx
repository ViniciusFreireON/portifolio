import React, { useEffect, useState, useRef } from "react";
import TypingText from "/src/components/projetos/TypingText"; // Importando o TypingText

// Imagens
import bgGradiente from "/assets/bggradiente.jpg";
import javascriptLogo from "../assets/Unofficial_JavaScript_logo_2.png";
import pythonLogo from "../assets/python.png";
import html5Logo from "../assets/html5.png";
import infinityImg from "../assets/infinity.png";
import bellivyImg from "../assets/bellivy.jpg";

// Importando o hook de flutuação
import { useFloatingAnimation } from "/src/components/projetos/UseFloatingAnimation";

const Projetos = () => {
  const [fadeInVisible, setFadeInVisible] = useState(false);
  const [fadeInTitleVisible, setFadeInTitleVisible] = useState(false);
  const [fadeInDescriptionVisible, setFadeInDescriptionVisible] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // Referências para as imagens decorativas
  const floatingImagesRef = useFloatingAnimation(3);

  // Estado para animação de fade nos projetos
  const fadeBaseClass = "transition-opacity duration-1000 ease-out transform";

  // Dados dos projetos
  const projetos = [
    {
      nome: "VEM SER INFINITY",
      descricao:
        "Plataforma institucional para vendas de cursos da Infinity School. Hackathon, 2025.",
      tipo: "Aplicação Web",
      tags: ["HTML", "CSS", "JAVASCRIPT", "TAILWIND"],
      imagem: infinityImg,
      website: "#",
      codigo: "#",
      backgroundSize: "150%",
      backgroundPosition: "left center",
      blur: "blur-[1px]",
    },
    {
      nome: "BELLIVY MODA PRAIA",
      descricao:
        "Plataforma institucional biográfica para empresa de segmento de moda praia. Bellivy Moda Praia, 2025.",
      tipo: "Aplicação Web",
      tags: ["HTML", "CSS", "JAVASCRIPT", "TAILWIND", "REACT"],
      imagem: bellivyImg,
      website: "#",
      codigo: "#",
      backgroundSize: "150%",
      backgroundPosition: "center",
      blur: "blur-[2px]",
      status: "em andamento",
    },
  ];

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

    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeInTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);

    const descriptionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeInDescriptionVisible(true);
          descriptionObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (descriptionRef.current) descriptionObserver.observe(descriptionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      if (descriptionRef.current) descriptionObserver.unobserve(descriptionRef.current);
    };
  }, []);

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative min-h-[140vh] p-16 bg-gradient-to-b from-[#131212] to-[#1F1E1E] text-white"
      style={{
        backgroundImage: `url(${bgGradiente})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorações */}
      <div
        id="decorations"
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-visible"
      >
        <div
          ref={(el) => (floatingImagesRef.current[0] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-20 absolute top-[2em] left-[10em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] blur-[1px] transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          <img
            src={javascriptLogo}
            alt="JavaScript"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={(el) => (floatingImagesRef.current[1] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 absolute top-[30em] left-[40em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] blur-[1px] transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          <img
            src={pythonLogo}
            alt="Python"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={(el) => (floatingImagesRef.current[2] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-20 absolute bottom-[40em] left-[70em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] blur-[1px] transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          <img
            src={html5Logo}
            alt="HTML5"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Título */}
      <div
        ref={titleRef}
        className={`pl-16 mb-10 relative -right-[19em] -top-20 z-10 ${fadeBaseClass} ${
          fadeInTitleVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } title-centralized`}
      >
        <h2 className="text-8xl font-poppins font-normal title-postition">
          Meus{" "}
          <span className="font-prata font-normal text-[#F3AD4C]">
            Projetos.
          </span>
        </h2>
      </div>

      {/* Descrição com animação de digitação */}
      <div className="typing-proj">
      <div
        ref={descriptionRef}
        className={`font-jakarta font-extralight tracking-[0.2em] text-[0.9em] relative -right-[35.5em] -top-[13em] ${fadeBaseClass} ${
          fadeInDescriptionVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <TypingText text="Um pouco do que já coloquei no mundo." speed={100} />
      </div>
        </div>

      {/* Lista de Projetos */}
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-4 justify-center max-w-5xl mx-auto mt-20 relative -top-20 z-10">
        {projetos.map((projeto, index) => (
          <div
            key={index}
            className={`${fadeBaseClass} ${
              fadeInVisible
                ? `opacity-100 translate-y-0 delay-[${400 + index * 200}ms]`
                : "opacity-0 translate-y-10"
            } bg-[#131212] rounded-lg shadow-lg drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)] max-w-md w-full flex flex-col justify-between font-poppins overflow-hidden border border-white/20`}
          >
            {/* Imagem do Projeto */}
            <div className="relative w-full h-[220px] rounded-t-lg overflow-hidden">
              <div
                className={`absolute inset-0 bg-cover bg-center filter scale-105 ${projeto.blur} transition-transform duration-300 ease-in-out transform hover:scale-105`}
                style={{
                  backgroundImage: `url(${projeto.imagem})`,
                  backgroundSize: projeto.backgroundSize,
                  backgroundPosition: projeto.backgroundPosition,
                }}
              />
            </div>

            {/* Conteúdo */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div className="self-start bg-black bg-opacity-50 px-3 py-2 rounded-[1em] mb-2 inline-block border border-white/20">
                <h3 className="text-white text-lg font-semibold">
                  {projeto.nome}
                </h3>
                <p className="text-xs text-gray-300 font-jakarta tracking-[0.1em]">
                  {projeto.tipo}
                </p>
              </div>

              {/* Tags com efeito de grow */}
              <div className="flex flex-wrap gap-2 mb-4">
                {projeto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-white text-xs font-light px-2 py-1 rounded-[1em] font-jakarta tracking-[0.1em] bg-black/50 border border-white/20 transition-all transform hover:scale-110 ease-in-out"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Descrição */}
              <p className="text-white text-[1em] mt-2">{projeto.descricao}</p>

              {/* Botões com animação de grow */}
              <div className="flex gap-4 mt-6 justify-center">
                {projeto.status === "em andamento" ? (
                  <a
                    href="#"
                    className="font-jakarta font-light text-[1.1em] tracking-[0.1em] border border-white/20 text-white px-14 py-4 rounded-[0.9em] transition-all duration-300 ease-in-out transform hover:scale-105 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] project-button"
                  >
                    Em andamento
                  </a>
                ) : (
                  <>
                    <a
                      href="https://hackathonmaster.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-jakarta tracking-[0.1em] text-[1.1em] font-light bg-gradient-to-b from-[#0A0B0C] to-[#171717] text-white px-14 py-4 rounded-[0.9em] transition-all duration-300 ease-in-out transform hover:scale-105 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] project-button"
                    >
                      Website
                    </a>
                    <a
                      href="https://github.com/ViniciusFreireON/hackathonmaster"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-jakarta font-light text-[1.1em] tracking-[0.1em] border border-white/20 text-white px-14 py-4 rounded-[0.9em] transition-all duration-300 ease-in-out transform hover:scale-105 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] project-button"
                    >
                      Código
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projetos;
