import React, { useEffect, useState, useMemo, useRef } from "react";
import { useFloatingAnimation } from "/src/components/contato/useFloatingAnimation";

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
        className="text-[0.9em] font-jakarta font-extralight mb-10 relative -bottom-[6.5em] -right-[0.5em] tracking-[0.2em]"
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
      className="relative min-h-[1vh] p-16 bg-gradient-to-b from-[#131212] to-[#1F1E1E] text-white"
      style={{
        backgroundImage: "url('/src/assets/bggradiente.jpg')",
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
          src="/src/assets/github.png"
          alt="JavaScript"
          style="top-[39em] left-[55em] opacity-20"
          speed="0.3"
        />
        <DecorativeImage
          ref={floatingRefs[1]}
          src="/src/assets/linkedin.png"
          alt="LinkedIn"
          style="top-[6em] left-[28em] opacity-20"
          speed="0.3"
        />
        <DecorativeImage
          ref={floatingRefs[2]}
          src="/src/assets/github.png"
          alt="GitHub"
          style="top-[17em] left-[60em] opacity-30"
          speed="0.5"
        />
        <DecorativeImage
          ref={floatingRefs[3]}
          src="/src/assets/instagram.png"
          alt="Instagram"
          style="top-[60em] left-[7em] opacity-20"
          speed="0.7"
        />
      </div>

      {/* TÍTULO */}
      <div
        className={`pl-16 mb-10 relative z-10 -right-[22em] -top-[11em] ${
          hasAnimated
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0"
        }`}
      >
        <h2 className="text-8xl font-poppins font-normal relative -left-[1.2em]">
          Entre em{" "}
          <span className="font-prata font-normal text-[#F3AD4C]">
            Contato.
          </span>
        </h2>
        <div
          className={`font-jakarta font-extralight tracking-[0.2em] text-[0.9em] relative -right-[10.5em] -top-[5em] ${
            hasAnimated
              ? "opacity-100 transition-opacity duration-1000 delay-300"
              : "opacity-0"
          }`}
        >
          <TypingText
            text="Tô por aqui, só mando um alô."
            speed={150}
            active={hasAnimated}
          />
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        className={`relative z-10 flex flex-col md:flex-row gap-10 max-w-6xl mx-auto mt-10 ${
          hasAnimated
            ? "opacity-100 transition-opacity duration-1000 delay-500"
            : "opacity-0"
        }`}
      >
        {/* Formulário */}
        <div className="bg-[#131212] border border-white/20 rounded-xl p-8 shadow-lg w-[600px] h-[830px]">
          <h3 className="text-[2.5em] leading-[1.1em] font-poppins mb-6">
            Transforme sua ideia <br />
            em <span className="text-[#F3AD4C] font-prata">Realidade.</span>
          </h3>
          <form className="space-y-4">
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
              className="font-jakarta font-light tracking-[0.1em] bg-gradient-to-b from-[#0A0B0C] to-[#171717] text-white text-[1.2em] px-[4em] py-4 rounded-[1em] transition-transform duration-500 ease-in-out drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 transform hover:scale-105"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Informações de Contato */}
        <div className="bg-[#131212] border border-white/20 rounded-xl p-8 shadow-lg w-[500px] h-[500px] font-poppins tracking-wide relative -bottom-[em]">
          <h3 className="text-[2.5em] leading-[1.1em] mb-4">
            Mundo Real <br />
            <span className="text-[#F3AD4C] font-prata">&</span> Digital.
          </h3>

          <div className="relative -bottom-[2em] -right-8 font-jakarta text-[1em] font-light tracking-[0.1em] space-y-6">
            <ContactInfo
              icon="/src/assets/envelope.png"
              label="Email:"
              value="vinicius.freire.fulldev@gmail.com"
            />
            <ContactInfo
              icon="/src/assets/localizacao.png"
              label="Localização:"
              value="Via Láctea, Terra, Brasil."
            />
            <ContactInfo
              icon="/src/assets/tel.png"
              label="Telefone:"
              value="55+ (71) 9 8129-1485"
            />

            <div className="flex gap-10 mt-4 relative -bottom-2">
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
                  className="transition transform hover:scale-110 bg-[#313131] bg-opacity-30 p-3 rounded-full border border-white/20"
                >
                  <img
                    src={`/src/assets/${name}.png`}
                    alt={name}
                    className={`w-10 h-10 ${
                      name === "linkedin" ? "relative -right-[0.2em]" : ""
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ label, type, placeholder }) => (
  <>
    <p className="font-jakarta text-[1em] font-light tracking-[0.1em] relative -bottom-3 -right-2">
      {label}
    </p>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        rows="4"
        className="w-full bg-[#313131]/50 text-white p-3 rounded-md border border-white/10 outline-none h-[20rem] font-jakarta tracking-[0.1em] font-extralight"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#313131]/50 text-white p-3 rounded-md border border-white/10 outline-none font-jakarta tracking-[0.1em] font-extralight"
      />
    )}
  </>
);

// 🔥 Aqui está o ContactInfo atualizado com o ícone visível no hover
const ContactInfo = ({ icon, label, value }) => {
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex items-start gap-3 relative">
      <img src={icon} alt={`${label} icon`} className="w-5 h-5 mt-1" />
      <div>
        <p className="text-white/70 mb-1">{label}</p>
        <div
          className="flex items-center gap-2 cursor-pointer text-white hover:underline select-none"
          onClick={handleCopy}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          title="Clique para copiar"
        >
          <p>{value}</p>

          {/* Ícone visível só enquanto o mouse estiver em cima */}
          {hovered && (
            <img
              src="/src/assets/copiar.png" // ajuste para o caminho correto do seu ícone
              alt="Ícone de copiar"
              className="w-4 h-4"
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
    className={`w-[200px] h-[200px] overflow-hidden rounded-lg absolute ${style} drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]`}
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
