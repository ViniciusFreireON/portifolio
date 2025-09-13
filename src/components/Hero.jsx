import { useEffect, useRef, useState } from "react";
import HeaderMenu from "/src/components/hero/HeaderMenu";
import TypingText from "/src/components/hero/TypingText";
import FooterSocial from "/src/components/hero/FooterSocial";

const Hero = () => {
  const htmlFormattedText = `
    <span>Hi, </span><span class="font-bold">I'm</span> 
  `;

  const [socialVisible, setSocialVisible] = useState(false);
  const [fadeInVisible, setFadeInVisible] = useState(false);

  // refs para parallax (se quiser usar)
  const bgRef = useRef(null);
  const sectionRef = useRef(null);
  const habilidadesRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setSocialVisible(true), 800);

    // Dispara fade in após montado
    setTimeout(() => setFadeInVisible(true), 300);

    // Parallax scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
      if (sectionRef.current) {
        sectionRef.current.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
      if (habilidadesRef.current) {
        habilidadesRef.current.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <HeaderMenu />

      {/* BACKGROUND PARALLAX */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/headerbg.jpg')",
          willChange: "transform",
        }}
      ></div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 text-white px-8 h-full flex flex-col justify-between select-none">
        {/* CENTRO: TÍTULO CENTRALIZADO NA TELA */}
        <div
          className={`flex flex-1 justify-center items-center relative -bottom-[3em] transition-opacity duration-1000 ease-out transform ${
            fadeInVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <TypingText htmlFormattedText={htmlFormattedText} />
            <h1 className="text-8xl font-poppins font-normal leading-tight bg-black/50 rounded-[0.3em] border border-white/20">
              <span className="rounded px-10 py- inline-block w-fit relative -left-2">
                Vinícius{" "}
              </span>
              <span className="text-[#F3AD4C] font-normal font-prata inline-block w-fit relative -left-8">
                Freire
              </span>
            </h1>
          </div>
        </div>

        {/* Subtítulo — parte inferior direita */}
        <div
          className={`mb-32 text-center mr-16 select-none relative -top-[9em] -right-[1.9em] transition-opacity duration-1000 ease-out transform delay-200 ${
            fadeInVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-jakarta font-light tracking-[0.1em] relative">
            DESENVOLVEDOR FULL STACK <br />
            <span>e DESIGNER UI/UX</span>
          </h2>
        </div>

        {/* Rodapé com texto + ícones */}
        <FooterSocial visible={socialVisible} />
      </div>
    </section>
  );
};

export default Hero;
