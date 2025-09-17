import React, { useState, useEffect, useRef } from "react";
import { db } from "/src/firebase/firebase"; // importa configuração do Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const socials = [
  {
    href: "#",
    icon: "/assets/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://github.com/ViniciusFreireON",
    icon: "/assets/github.png",
    alt: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/vinícius-freire-066884375",
    icon: "/assets/linkedin.png",
    alt: "LinkedIn",
  },
];

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  // estados para o input e feedback
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  // envia para o Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "footerContacts"), {
        contato: inputValue,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setInputValue("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar no Firestore:", err);
    } finally {
      setLoading(false);
    }
  };

  const baseDelay = 150;

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-b from-[#141414] to-[#1A1A1A] text-white px-16 py-16 min-h-[40vh] flex flex-col md:flex-row justify-between items-start gap-10 relative mobile:px-8 mobile:py-12 mobile:min-h-[50vh]"
    >
      {/* Esquerda: Citação + Input */}
      <div
        className={`flex flex-col gap-6 max-w-xl w-full mobile:max-w-full
          transition-opacity transform duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ transitionDelay: `${baseDelay * 1}ms` }}
      >
        <blockquote className="mobile:text-center">
          <p className="text-[1em] font-light leading-relaxed font-jakarta tracking-[0.1em] mobile:text-sm">
            "No horizonte de eventos da criatividade,
            <br className="mobile:hidden" />
            tudo se transforma"
          </p>
        </blockquote>

        {/* Formulário */}
        <form
          className="relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] w-full -bottom-5 mobile:-bottom-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Quer criar algo? Me envie seu e-mail ou WhatsApp."
            className="w-full px-6 py-4 pr-28 rounded-[0.8em] border border-white/20 bg-black bg-opacity-50 text-white font-font-jakarta text-[0.9em] font-extralight placeholder-white focus:outline-none focus:ring-2 mobile:px-4 mobile:py-3 mobile:pr-24 mobile:text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light px-5 py-2 rounded-[0.8em] transition-transform duration-300 hover:scale-105 cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 tracking-[0.1em] mobile:px-4 mobile:py-1.5 mobile:text-sm"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {success && (
          <p className="text-green-400 font-light font-jakarta text-sm mt-2">
            ✅ Enviado com sucesso!
          </p>
        )}
      </div>

      {/* Direita: Redes sociais + Botão */}
      <div
        className={`flex flex-col items-start md:items-end gap-6 relative -left-[2em] mobile:left-0 mobile:items-center mobile:w-full
          transition-opacity transform duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ transitionDelay: `${baseDelay * 2}ms` }}
      >
        <p className="font-light font-jakarta tracking-[0.1em] text-[1em] relative -left-[3em] mobile:left-0 mobile:text-center mobile:mb-2">
          Onde me achar:
        </p>

        <div className="flex gap-6 mobile:gap-4 mobile:justify-center">
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
                mobile:p-2
              `}
              style={{ transitionDelay: `${baseDelay * (3 + index)}ms` }}
            >
              <img
                src={social.icon}
                alt={social.alt}
                className="w-10 h-10 transition-transform duration-300 mobile:w-8 mobile:h-8"
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
            mobile:left-0 mobile:px-6 mobile:py-2.5 mobile:text-sm mobile:mx-auto
          `}
          style={{ transitionDelay: `${baseDelay * 7}ms` }}
          target="_blank"
        >
          <img
            src="/assets/whatsapp.png"
            alt="WhatsApp"
            className="w-5 h-5 transition-transform duration-300 mobile:w-4 mobile:h-4"
          />
          Fale comigo
        </a>
      </div>

      {/* Direitos reservados */}
      <div
        className={`absolute bottom-6 left-16 text-[1em] text-white/70 font-light text-left font-jakarta tracking-[0.1em]
          transition-opacity transform duration-700 mobile:bottom-4 mobile:left-0 mobile:right-0 mobile:text-center mobile:text-sm mobile:px-4
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ transitionDelay: `${baseDelay * 8}ms` }}
      >
        © 2025 Vinícius Freire | Todos os Direitos reservados.
      </div>

      {/* Media Queries para Smartphones */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile\\:px-8 {
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .mobile\\:py-12 {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          .mobile\\:min-h-\\[50vh\\] {
            min-height: 50vh;
          }
          .mobile\\:max-w-full {
            max-width: 100%;
          }
          .mobile\\:text-center {
            text-align: center;
          }
          .mobile\\:text-sm {
            font-size: 0.875rem;
          }
          .mobile\\:-bottom-3 {
            bottom: -0.75rem;
          }
          .mobile\\:px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .mobile\\:py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          .mobile\\:pr-24 {
            padding-right: 6rem;
          }
          .mobile\\:py-1\\.5 {
            padding-top: 0.375rem;
            padding-bottom: 0.375rem;
          }
          .mobile\\:left-0 {
            left: 0;
          }
          .mobile\\:items-center {
            align-items: center;
          }
          .mobile\\:w-full {
            width: 100%;
          }
          .mobile\\:mb-2 {
            margin-bottom: 0.5rem;
          }
          .mobile\\:gap-4 {
            gap: 1rem;
          }
          .mobile\\:justify-center {
            justify-content: center;
          }
          .mobile\\:p-2 {
            padding: 0.5rem;
          }
          .mobile\\:w-8 {
            width: 2rem;
          }
          .mobile\\:h-8 {
            height: 2rem;
          }
          .mobile\\:px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .mobile\\:py-2\\.5 {
            padding-top: 0.625rem;
            padding-bottom: 0.625rem;
          }
          .mobile\\:mx-auto {
            margin-left: auto;
            margin-right: auto;
          }
          .mobile\\:w-4 {
            width: 1rem;
          }
          .mobile\\:h-4 {
            height: 1rem;
          }
          .mobile\\:bottom-4 {
            bottom: 1rem;
          }
          .mobile\\:right-0 {
            right: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
