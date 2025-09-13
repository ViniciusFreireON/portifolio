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

  const bgRef = useRef(null);
  const sectionRef = useRef(null);
  const habilidadesRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setSocialVisible(true), 800);
    setTimeout(() => setFadeInVisible(true), 300);

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
      className=" relative w-full h-screen overflow-hidden"
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
      <div className="relative z-10 text-white px-4 sm:px-6 md:px-8 h-full flex flex-col justify-between select-none">
        {/* CENTRO: TÍTULO + SUBTÍTULO CENTRALIZADOS */}
        <div
          className={`flex flex-1 justify-center items-center relative transition-opacity duration-1000 ease-out transform ${
            fadeInVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } 
          -bottom-[2em] sm:-bottom-[2em] md:-bottom-[3em]`}
        >
          <div className="text-center">
            {/* “Hi, I'm” sumindo abaixo de md */}
            <div className="hiim">
            <div className="hidden md:block">
              <TypingText htmlFormattedText={htmlFormattedText} />
            </div>
          </div>
            <div className="text-hero">
            <h1 className="  hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-poppins font-normal leading-tight bg-black/50 rounded-[0.3em] border border-white/20">
              <span className="rounded px-4 sm:px-6 md:px-10 py-1 inline-block w-fit relative -left-1 sm:-left-2">
                Vinícius{" "}
              </span>
              <span className="text-[#F3AD4C] font-normal font-prata inline-block w-fit relative -left-2 sm:-left-4 md:-left-8">
                Freire
              </span>
            </h1>

            {/* SUBTÍTULO CENTRALIZADO ABAIXO DO TÍTULO, MAIS PRÓXIMO */}
            <div className="mt-2 sm:mt-3 md:mt-4 transition-opacity duration-1000 ease-out delay-200">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-jakarta font-light tracking-wider">
                DESENVOLVEDOR FULL STACK <br />
                <span>e DESIGNER UI/UX</span>
              </h2>
            </div>
            </div>
          </div>
        </div>

        {/* Rodapé com texto + ícones */}
        <FooterSocial visible={socialVisible} />
      </div>
    </section>
  );
};

export default Hero;
