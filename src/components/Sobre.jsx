import React, { useState, useEffect, useRef } from "react";
import bgGradiente from "../assets/bggradiente.jpg";
import autoretrato2 from "../assets/autoretrato2.jpeg";
import autoretrato3 from "../assets/autoretrato3.jpeg";
import autoretrato4 from "../assets/autoretrato4.jpeg";
import autoretrato5 from "../assets/autoretrato5.jpeg";

import TypingText from "/src/components/sobre/TypingText"; // Ajuste o caminho conforme seu projeto

// Hook para animação de flutuação lenta e suave
function useFloatingAnimation(count) {
  const refs = useRef([]);

  useEffect(() => {
    let frameId;
    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      refs.current.forEach((el) => {
        if (!el) return;
        const speed = 0.0003; // Velocidade lenta igual para todas
        const amplitude = 10; // Movimento vertical de até +-10px
        const y = Math.sin(elapsed * speed * 2 * Math.PI) * amplitude;
        const x = Math.cos(elapsed * speed * 1.5 * Math.PI) * (amplitude / 3);

        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      });

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [count]);

  return refs;
}

const Sobre = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false); // título + texto juntos
  const [fotoVisible, setFotoVisible] = useState(false);

  // Use o hook para as 3 imagens decorativas
  const floatingRefs = useFloatingAnimation(3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 200); // título + texto aparecem juntos após 200ms
          setTimeout(() => setFotoVisible(true), 400);

          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const textoAnimado = `Antes do código e design, tem uma pessoa aqui.`;

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative min-h-[140vh] p-16 text-white overflow-x-hidden"
      style={{ backgroundAttachment: "fixed" }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgGradiente})`,
          backgroundAttachment: "fixed",
        }}
      />

      {/* DECORAÇÕES */}
      <div
        id="decorations"
        className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
      >
        {/* Imagem decorativa 1 */}
        <div
          ref={(el) => (floatingRefs.current[0] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 relative -bottom-[45em] -left-2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        >
          <img
            src={autoretrato2}
            alt="Decorativa 1"
            className="w-full h-full object-cover blur-[1px] grayscale"
          />
        </div>

        {/* Imagem decorativa 2 */}
        <div
          ref={(el) => (floatingRefs.current[1] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 scale-x-[-1] relative -right-[28em] -bottom-[40em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        >
          <img
            src={autoretrato3}
            alt="Decorativa 2"
            className="w-full h-full object-cover blur-[1px] grayscale"
          />
        </div>

        {/* Imagem decorativa 3 */}
        <div
          ref={(el) => (floatingRefs.current[2] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 relative -top-[14em] -right-[27em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        >
          <img
            src={autoretrato4}
            alt="Decorativa 3"
            className="w-full h-full object-cover blur-[1px] grayscale"
          />
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="pl-16 relative z-10">
        {/* TÍTULO E TEXTO COM ANIMAÇÃO JUNTOS */}
        <div
          className={`transition-opacity transition-transform duration-700 ease-out transform ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-8xl font-poppins font-normal relative -left-[0.3em] -bottom-[1em]">
            Sobre{" "}
            <span className="font-prata font-normal text-[#F3AD4C]">Mim.</span>
          </h2>

          {/* Texto animado */}
          <TypingText text={textoAnimado} speed={100} />
        </div>

        {/* Imagem e Texto */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* FOTO COM ANIMAÇÃO */}
          <div
            className={`bg-[#D9D9D9] p-5 rounded-lg drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] relative -bottom-[5em] pb-[2em] transition-opacity transition-transform duration-700 ease-out transform ${
              fotoVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src={autoretrato5}
              alt="Autorretrato"
              className="w-[420px] h-[520px] object-cover object-top rounded-lg drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] -scale-x-100"
            />
            <p className="text-center text-black font-jakarta text-sm tracking-[0.2em] relative -bottom-4">
              Vinícius Freire, 2025.
            </p>
          </div>

          {/* TEXTO COM ANIMAÇÃO */}
          <article
            className={`w-[620px] h-[670px] flex flex-col text-base font-prata leading-relaxed bg-[#131212] p-8 rounded-lg border border-white/20 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] relative -right-40 transition-opacity transition-transform duration-700 ease-out transform ${
              fotoVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4 overflow-y-auto pr-2 flex-1 font-light text-[20px]">
              <p className="font-poppins">
                Olá! Sou Vinícius Freire, desenvolvedor{" "}
                <span className="text-[#F3AD4C] font-prata">Full-Stack</span>{" "}
                apaixonado por criar experiências digitais que unem design{" "}
                <span className="text-[#F3AD4C] font-prata">elegante</span>,
                usabilidade intuitiva e{" "}
                <span className="text-[#F3AD4C] font-prata">
                  performance impecável
                </span>
                .
              </p>

              <p className="font-poppins">
                Comecei aos 17 anos no{" "}
                <span className="text-[#F3AD4C] font-prata">Front-End</span>,
                brincando com interfaces e pequenas interações, e aos poucos fui
                me aprofundando no{" "}
                <span className="text-[#F3AD4C] font-prata">Back-End</span>,
                construindo uma visão completa de como os sistemas funcionam por
                dentro.
              </p>

              <p className="font-poppins">
                Gosto de desafios que me fazem experimentar, aprender novas
                tecnologias e{" "}
                <span className="text-[#F3AD4C] font-prata">
                  criar soluções
                </span>{" "}
                que realmente encantem quem as utiliza. Cada projeto é uma
                oportunidade de unir criatividade e{" "}
                <span className="text-[#F3AD4C] font-prata">técnica</span> de
                forma divertida e eficaz.
              </p>
            </div>

            {/* Botão */}
            <div className="mt-4">
              <a
                href="https://linktr.ee/viniciusfreiredev"
                className="font-poppins font-light border border-white/20 bg-gradient-to-b from-[#0A0B0C] to-[#171717] text-white text-[1.2em] px-8 py-3 rounded-[0.9em] inline-block cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entre em contato
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
