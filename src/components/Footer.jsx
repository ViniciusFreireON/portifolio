import React, { useState, useEffect, useRef } from "react";

const socials = [
  {
    href: "#",
    icon: "/src/assets/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://github.com/ViniciusFreireON",
    icon: "/src/assets/github.png",
    alt: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/vinícius-freire-066884375",
    icon: "/src/assets/linkedin.png",
    alt: "LinkedIn",
  },
];

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const baseDelay = 150;

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-b from-[#141414] to-[#1A1A1A] text-white px-16 py-16 min-h-[40vh] flex flex-col md:flex-row justify-between items-start gap-10 relative"
    >
      {/* Esquerda: Citação + Input */}
      <div
        className={`flex flex-col gap-6 max-w-xl w-full
          transition-opacity transform duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ transitionDelay: `${baseDelay * 1}ms` }}
      >
        <blockquote>
          <p className="text-[1em] font-light leading-relaxed font-jakarta tracking-[0.1em]">
            "No horizonte de eventos da criatividade,
            <br />
            tudo se transforma"
          </p>
        </blockquote>

        {/* Formulário */}
        <form
          className="relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] w-full -bottom-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Quer criar algo? Me envie seu e-mail ou WhatsApp."
            className="w-full px-6 py-4 pr-28 rounded-[0.8em] border border-white/20 bg-black bg-opacity-50 text-white font-font-jakarta text-[0.9em] font-extralight placeholder-white focus:outline-none focus:ring-2"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light px-5 py-2 rounded-[0.8em] transition-transform duration-300 hover:scale-105 cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 tracking-[0.1em]"
          >
            Enviar
          </button>
        </form>
      </div>

      {/* Direita: Redes sociais + Botão */}
      <div
        className={`flex flex-col items-start md:items-end gap-6 relative -left-[2em]
          transition-opacity transform duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ transitionDelay: `${baseDelay * 2}ms` }}
      >
        <p className="font-light font-jakarta tracking-[0.1em] text-[1em] relative -left-[3em]">
          Onde me achar:
        </p>

        <div className="flex gap-6">
          {socials.map((social, index) => (
            <a
              key={social.alt}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-[#313131] bg-opacity-30 p-3 rounded-full border border-white/20
                hover:opacity-80 hover:scale-105 transition-transform duration-300
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
              style={{ transitionDelay: `${baseDelay * (3 + index)}ms` }}
            >
              <img
                src={social.icon}
                alt={social.alt}
                className="w-10 h-10 transition-transform duration-300"
              />
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/5571981391485?text=Ol%C3%A1%21%20Sou%20dev%20Fullstack%20especializado%20em%20aplica%C3%A7%C3%B5es%20escal%C3%A1veis%2C%20seguras%20e%20perform%C3%A1ticas.%20Trabalho%20com%20frontend%2C%20backend%2C%20integra%C3%A7%C3%B5es%20via%20API%20e%20automa%C3%A7%C3%B5es%20de%20processos.%20Me%20chama%20e%20vamos%20discutir%20sua%20necessidade%20t%C3%A9cnica%21"
          type="button"
          className={`bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light tracking-[0.1em] px-8 py-3 rounded-[0.8em] 
            hover:opacity-80 hover:scale-105 transition-transform duration-300 border border-white/20 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] relative -left-[1em] flex items-center gap-2 
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: `${baseDelay * 7}ms` }}
          target="_blank"
        >
          <img
            src="/src/assets/whatsapp.png"
            alt="WhatsApp"
            className="w-5 h-5 transition-transform duration-300"
          />
          Fale comigo
        </a>
      </div>

      {/* Direitos reservados */}
      <div
        className={`absolute bottom-6 left-16 text-[1em] text-white/70 font-light text-left font-jakarta tracking-[0.1em]
          transition-opacity transform duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ transitionDelay: `${baseDelay * 8}ms` }}
      >
        © 2025 Vinícius Freire | Todos os Direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
