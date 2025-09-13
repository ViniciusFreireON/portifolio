import React, { useState, useEffect, useRef } from "react";
import bgGradiente from "/assets/bggradiente.jpg";
import autoretrato2 from "../assets/autoretrato2.jpeg";
import autoretrato3 from "../assets/autoretrato3.jpeg";
import autoretrato4 from "../assets/autoretrato4.jpeg";
import autoretrato5 from "../assets/autoretrato5.jpeg";

import TypingText from "/src/components/sobre/TypingText";

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
  }, [count]);

  return refs;
}

const Sobre = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [fotoVisible, setFotoVisible] = useState(false);

  const floatingRefs = useFloatingAnimation(3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 200);
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
        <div
          ref={(el) => (floatingRefs.current[0] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 relative -bottom-[43em] -right-[15em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        >
          <img
            src={autoretrato2}
            alt="Decorativa 1"
            className="w-full h-full object-cover blur-[1px] grayscale"
          />
        </div>

        <div
          ref={(el) => (floatingRefs.current[1] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 scale-x-[-1] relative -right-[40em] -bottom-[37em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        >
          <img
            src={autoretrato3}
            alt="Decorativa 2"
            className="w-full h-full object-cover blur-[1px] grayscale"
          />
        </div>

        <div
          ref={(el) => (floatingRefs.current[2] = el)}
          className="w-[200px] h-[200px] overflow-hidden rounded-lg opacity-50 relative -top-[14em] -right-[42em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        >
          <img
            src={autoretrato4}
            alt="Decorativa 3"
            className="w-full h-full object-cover blur-[1px] grayscale"
          />
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="w-full max-w-[1200px] mx-auto relative z-10 mobile-conteudo-principal">
        <div
          className={`titulo-texto transition-opacity duration-700 ease-out flex flex-col mobile-center-text mobile-title-container ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="sobre-mim text-8xl font-poppins font-normal relative -left-[0.3em] -bottom-[em] order-1 mobile-title">
            Sobre{" "}
            <span className="font-prata font-normal text-[#F3AD4C]">Mim.</span>
          </h2>
          <div className="relative -bottom-[4em] typing">
            <TypingText
              text={textoAnimado}
              speed={100}
              className="order-2 mt-4"
            />
          </div>
        </div>

        {/* CONTAINER INDEPENDENTES */}
        <div className="conteudo-principal grid grid-cols-1 lg:grid-cols-[auto_auto] gap-12 items-start mobile-conteudo-principal mt-12">
          {/* FOTO */}
          <div
            className={`foto-container bg-[#D9D9D9] w-[430px] pl-4 pr-4 pt-3 pb-8 rounded-lg drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] relative transition-opacity duration-700 ease-out mobile-foto-container ${
              fotoVisible ? "opacity-100" : "opacity-0"
            } flex flex-col items-center`}
          >
            <img
              src={autoretrato5}
              alt="Autorretrato"
              className="autorretato-img w-[400px] h-[500px] object-cover object-top rounded-lg drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] -scale-x-100 mobile-foto-img"
            />
            <p className="text-center text-black font-jakarta text-sm tracking-[0.2em] relative -bottom-4 mobile-foto-caption">
              Vinícius Freire, 2025.
            </p>
          </div>

          {/* ARTIGO / TEXTO */}
          <article
            className={`texto-artigo w-[600px] max-h-[900px] flex flex-col text-base font-prata leading-relaxed bg-[#131212] p-8 rounded-lg border border-white/20 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] relative transition-opacity duration-700 ease-out mobile-texto-artigo sobre-caixa-texto ${
              fotoVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="space-y-4 overflow-y-auto pr-3 flex-1 font-light text-[20px] mobile-texto-content mobile-text-box">
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

            <div className="mt-4 flex justify-center mobile-button-container">
              <a
                href="https://linktr.ee/viniciusfreiredev"
                className="font-poppins font-light border border-white/20 bg-gradient-to-b from-[#0A0B0C] to-[#171717] text-white text-[1.2em] px-8 py-3 rounded-[0.9em] inline-block cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 mobile-button-container a"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entre em contato
              </a>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .mobile-title-container {
            /* flex-col + ordem já aplicados */
          }
          .mobile-title-container h2 {
            order: 1;
          }
          .mobile-title-container .order-2 {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
};

export default Sobre;