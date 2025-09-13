import React, { useEffect, useState, useMemo, useRef } from "react";
import { useFloatingAnimation } from "/src/components/contato/UseFloatingAnimation";

// TypingText agora recebe prop active
const TypingText = ({ text = "", speed = 150, active = false }) => {
  const cleanText = text.replace(/\s{2,}/g, " ").trim();

  const [content, setContent] = useState("");
  const indexRef = useRef(0);
  const tagBufferRef = useRef("");
  const isTagRef = useRef(false);

  useEffect(() => {
    if (!active) {
      // Resetar se não ativo
      setContent("");
      indexRef.current = 0;
      tagBufferRef.current = "";
      isTagRef.current = false;
      return;
    }

    // Se ativo, roda animação
    setContent("");
    indexRef.current = 0;
    tagBufferRef.current = "";
    isTagRef.current = false;

    function type() {
      if (indexRef.current >= cleanText.length) return;

      const char = cleanText[indexRef.current];

      if (char === "<") {
        isTagRef.current = true;
      }

      if (isTagRef.current) {
        tagBufferRef.current += char;
        if (char === ">") {
          setContent((prev) => prev + tagBufferRef.current);
          tagBufferRef.current = "";
          isTagRef.current = false;
        }
      } else {
        setContent((prev) => prev + char);
      }

      indexRef.current++;

      setTimeout(type, isTagRef.current ? 0 : speed);
    }

    type();
  }, [cleanText, speed, active]);

  return (
    <>
      <p
        className="text-[0.9em] font-jakarta font-extralight tracking-[0.2em] text-center mobile:text-sm"
        dangerouslySetInnerHTML={{
          __html: content + (active ? `<span class="blink">|</span>` : ""),
        }}
      />
      <style jsx>{`
        .blink {
          animation: blink-animation 1s steps(2, start) infinite;
          -webkit-animation: blink-animation 1s steps(2, start) infinite;
        }
        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }
        @-webkit-keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </>
  );
};

const Contato = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const floatingRefs = useMemo(() => {
    return Array(4)
      .fill(0)
      .map(() => React.createRef());
  }, []);

  useFloatingAnimation(floatingRefs);

  useEffect(() => {
    const section = document.getElementById("contato");

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="contato"
      className="relative min-h-[1vh] p-16 bg-gradient-to-b from-[#131212] to-[#1F1E1E] text-white mobile:p-8"
      style={{
        backgroundImage: "url('/assets/bggradiente.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* IMAGENS DECORATIVAS */}
      <div
        id="decorations"
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden"
      >
        <DecorativeImage
          ref={floatingRefs[0]}
          src="/assets/github.png"
          alt="GitHub"
          style="top-[39em] left-[60em] opacity-20 mobile:top-[15em] mobile:left-[5em] mobile:opacity-10"
          speed="0.3"
        />
        <DecorativeImage
          ref={floatingRefs[1]}
          src="/assets/linkedin.png"
          alt="LinkedIn"
          style="top-[6em] left-[28em] opacity-20 mobile:top-[5em] mobile:left-[70%] mobile:opacity-10"
          speed="0.3"
        />
        
        <DecorativeImage
          ref={floatingRefs[3]}
          src="/assets/instagram.png"
          alt="Instagram"
          style="top-[60em] left-[7em] opacity-20 mobile:top-[40em] mobile:left-[10%] mobile:opacity-10"
          speed="0.7"
        />
      </div>

      {/* TÍTULO CENTRALIZADO */}
      <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10 mobile:mb-10">
        {/* Título */}
        <div
          className={`${hasAnimated
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0"
          }`}
        >
          <h2 className="text-8xl font-poppins font-normal mobile:text-5xl">
            Entre em{" "}
            <span className="font-prata font-normal text-[#F3AD4C]">
              Contato.
            </span>
          </h2>
        </div>

        {/* Descrição com animação de digitação - CENTRALIZADA */}
        <div
          className={`mt-6 ${hasAnimated
            ? "opacity-100 transition-opacity duration-1000 delay-300"
            : "opacity-0"
          } mobile:mt-4`}
        >
          <TypingText
            text="Tô por aqui, só manda um alô."
            speed={150}
            active={hasAnimated}
          />
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        className={`relative z-10 flex flex-col md:flex-row gap-10 max-w-6xl mx-auto mt-10 mobile:mt-6 mobile:gap-8 ${
          hasAnimated
            ? "opacity-100 transition-opacity duration-1000 delay-500"
            : "opacity-0"
        }`}
      >
        {/* Formulário */}
        <div className="bg-[#131212] border border-white/20 rounded-xl p-8 shadow-lg w-[600px] h-[830px] mobile:w-full mobile:h-auto mobile:p-6">
          <h3 className="text-[2.5em] leading-[1.1em] font-poppins mb-6 mobile:text-2xl mobile:mb-4">
            Transforme sua ideia <br />
            em <span className="text-[#F3AD4C] font-prata">Realidade.</span>
          </h3>
          <form className="space-y-4 mobile:space-y-3">
            <FormField
              label="Nome"
              type="text"
              placeholder="Ex: Vinícius Freire"
            />
            <FormField label="E-mail" type="email" placeholder="E-mail" />
            <FormField
              label="Sua mensagem"
              type="textarea"
              placeholder="Sua mensagem"
            />

            <button
              type="submit"
              className="font-jakarta font-light tracking-[0.1em] bg-gradient-to-b from-[#0A0B0C] to-[#171717] text-white text-[1.2em] px-[4em] py-4 rounded-[1em] transition-transform duration-500 ease-in-out drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 transform hover:scale-105 mobile:text-base mobile:px-8 mobile:py-3 mobile:w-full"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Informações de Contato */}
        <div className="bg-[#131212] border border-white/20 rounded-xl p-8 shadow-lg w-[500px] h-[500px] font-poppins tracking-wide mobile:w-full mobile:h-auto mobile:p-6">
          <h3 className="text-[2.5em] leading-[1.1em] mb-4 mobile:text-2xl mobile:mb-3">
            Mundo Real <br />
            <span className="text-[#F3AD4C] font-prata">&</span> Digital.
          </h3>

          <div className="font-jakarta text-[1em] font-light tracking-[0.1em] space-y-6 mobile:space-y-4 mobile:text-sm">
            <ContactInfo
              icon="/assets/envelope.png"
              label="Email:"
              value="vinicius.freire.fulldev@gmail.com"
            />
            <ContactInfo
              icon="/assets/localizacao.png"
              label="Localização:"
              value="Via Láctea, Terra, Brasil."
            />
            <ContactInfo
              icon="/assets/tel.png"
              label="Telefone:"
              value="55+ (71) 9 8129-1485"
            />

            <div className="flex gap-10 mt-4 mobile:gap-6 mobile:justify-center mobile:mt-6">
              {[
                {
                  name: "instagram",
                  url: "https://www.instagram.com/_vinifreire.dev",
                },
                { name: "github", url: "https://github.com/ViniciusFreireON" },
                {
                  name: "linkedin",
                  url: "https://www.linkedin.com/in/vinicius-freire-066884375",
                },
              ].map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform hover:scale-110 bg-[#313131] bg-opacity-30 p-3 rounded-full border border-white/20 mobile:p-2"
                >
                  <img
                    src={`/assets/${name}.png`}
                    alt={name}
                    className={`w-10 h-10 mobile:w-8 mobile:h-8 ${
                      name === "linkedin" ? "relative -right-[0.2em]" : ""
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Queries para Smartphones */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile\\:p-8 {
            padding: 2rem;
          }
          .mobile\\:text-5xl {
            font-size: 3rem;
          }
          .mobile\\:mb-10 {
            margin-bottom: 2.5rem;
          }
          .mobile\\:mt-4 {
            margin-top: 1rem;
          }
          .mobile\\:text-sm {
            font-size: 0.875rem;
          }
          .mobile\\:mt-6 {
            margin-top: 1.5rem;
          }
          .mobile\\:gap-8 {
            gap: 2rem;
          }
          .mobile\\:w-full {
            width: 100%;
          }
          .mobile\\:h-auto {
            height: auto;
          }
          .mobile\\:p-6 {
            padding: 1.5rem;
          }
          .mobile\\:text-2xl {
            font-size: 1.5rem;
          }
          .mobile\\:mb-4 {
            margin-bottom: 1rem;
          }
          .mobile\\:space-y-3 {
            margin-top: 0.75rem;
          }
          .mobile\\:text-base {
            font-size: 1rem;
          }
          .mobile\\:px-8 {
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .mobile\\:py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          .mobile\\:w-full {
            width: 100%;
          }
          .mobile\\:mb-3 {
            margin-bottom: 0.75rem;
          }
          .mobile\\:space-y-4 {
            margin-top: 1rem;
          }
          .mobile\\:gap-6 {
            gap: 1.5rem;
          }
          .mobile\\:justify-center {
            justify-content: center;
          }
          .mobile\\:mt-6 {
            margin-top: 1.5rem;
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
          .mobile\\:top-\\[15em\\] {
            top: 15em;
          }
          .mobile\\:left-\\[5em\\] {
            left: 5em;
          }
          .mobile\\:opacity-10 {
            opacity: 0.1;
          }
          .mobile\\:top-\\[5em\\] {
            top: 5em;
          }
          .mobile\\:left-\\[70\\%\\] {
            left: 70%;
          }
          .mobile\\:top-\\[40em\\] {
            top: 40em;
          }
          .mobile\\:left-\\[10\\%\\] {
            left: 10%;
          }
        }
      `}</style>
    </section>
  );
};

const FormField = ({ label, type, placeholder }) => (
  <>
    <p className="font-jakarta text-[1em] font-light tracking-[0.1em] relative -bottom-3 -right-2 mobile:text-sm mobile:-bottom-2 mobile:-right-1">
      {label}
    </p>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        rows="4"
        className="w-full bg-[#313131]/50 text-white p-3 rounded-md border border-white/10 outline-none h-[20rem] font-jakarta tracking-[0.1em] font-extralight mobile:h-[15rem] mobile:text-sm"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#313131]/50 text-white p-3 rounded-md border border-white/10 outline-none font-jakarta tracking-[0.1em] font-extralight mobile:text-sm mobile:p-2"
      />
    )}
  </>
);

// ContactInfo component (mantido igual)
const ContactInfo = ({ icon, label, value }) => {
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex items-start gap-3 relative">
      <img src={icon} alt={`${label} icon`} className="w-5 h-5 mt-1 mobile:w-4 mobile:h-4" />
      <div>
        <p className="text-white/70 mb-1 mobile:text-sm">{label}</p>
        <div
          className="flex items-center gap-2 cursor-pointer text-white hover:underline select-none mobile:text-sm"
          onClick={handleCopy}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          title="Clique para copiar"
        >
          <p>{value}</p>
          {hovered && (
            <img
              src="/assets/copiar.png"
              alt="Ícone de copiar"
              className="w-4 h-4 mobile:w-3 mobile:h-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const DecorativeImage = React.forwardRef(({ src, alt, style }, ref) => (
  <div
    ref={ref}
    className={`w-[200px] h-[200px] overflow-hidden rounded-lg absolute ${style} drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] mobile:w-[120px] mobile:h-[120px]`}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover blur-[1px]"
    />
  </div>
));
DecorativeImage.displayName = "DecorativeImage";

export default Contato;