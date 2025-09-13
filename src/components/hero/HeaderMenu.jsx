import { useState, useEffect } from "react";

const HeaderMenu = () => {
  const [navVisible, setNavVisible] = useState(false);
  const [leftBtnVisible, setLeftBtnVisible] = useState(false);
  const [rightBtnVisible, setRightBtnVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLeftBtnVisible(true), 200);
    setTimeout(() => setRightBtnVisible(true), 400);
    setTimeout(() => setNavVisible(true), 600);
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  return (
    <header id="menu" className="w-full fixed top-0 z-50">
      <div className="py-8 relative">
        {/* Botão "Whatsapp" à esquerda */}
        <a
          href="https://wa.me/5571981391485?text=Ol%C3%A1%21%20Sou%20dev%20Fullstack%20especializado%20em%20aplica%C3%A7%C3%B5es%20escal%C3%A1veis%2C%20seguras%20e%20perform%C3%A1ticas.%20Trabalho%20com%20frontend%2C%20backend%2C%20integra%C3%A7%C3%B5es%20via%20API%20e%20automa%C3%A7%C3%B5es%20de%20processos.%20Me%20chama%20e%20vamos%20discutir%20sua%20necessidade%20t%C3%A9cnica%21"
          className={`absolute left-[8em] top-[2.8em] -translate-y-1/2 flex items-center gap-2 bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light tracking-[0.1em] px-5 py-2 rounded-[0.8em] 
            transition-opacity transition-transform duration-700 ease-out cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 z-50
            transform hover:scale-105 transition-transform duration-300
            ${
              leftBtnVisible
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-[-20px] scale-95 pointer-events-none"
            }
          `}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/whatsapp.png"
            alt="Ícone de mensagem"
            className="w-4 h-4"
          />
          Fale comigo
        </a>

        {/* Botão Menu à direita */}
        <a
          href="#menu"
          onClick={toggleMenu}
          className={`relative -right-[80em] top-[0.9em] -translate-y-1/2 flex items-center justify-center bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light tracking-[0.1em] py-2 rounded-[0.8em] 
            drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 z-50
            transform hover:scale-105 transition-transform duration-300 cursor-pointer
            transition-width duration-500 ease-in-out
            ${menuOpen ? "w-12 px-0" : "w-[7rem] px-5"}
            ${
              rightBtnVisible
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
            }
          `}
          aria-label="Toggle menu"
        >
          <div
            className={`relative h-[1.5rem] flex items-center justify-center transition-all duration-500 ease-in-out ${
              menuOpen ? "w-6" : "w-[5.5rem]"
            }`}
          >
            {/* Texto + barras */}
            <div
              className={`absolute inset-0 flex items-center gap-2 justify-center transition-opacity duration-500 ease-in-out transform ${
                menuOpen
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100 scale-100 pointer-events-auto"
              }`}
            >
              <span>Menu</span>
              <div className="flex flex-col gap-[2px] relative -bottom-[0.1em]">
                <span className="block w-6 h-[2px] bg-white rounded-full"></span>
                <span className="block w-6 h-[2px] bg-white rounded-full"></span>
              </div>
            </div>

            {/* Ícone X */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out transform ${
                menuOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </a>

        {/* Nav central */}
        <nav
          className={`flex justify-center relative transition-transform transition-opacity duration-700 ease-out relative -top-9 ${
            navVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
          style={{ width: "45rem", minHeight: "4.5rem" }}
        >
          {/* Container para posicionar form e menu */}
          <div className="relative w-full relative -right-[26.5em]">
            {/* Form */}
            <form
              className={`absolute inset-0 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] w-full transition-opacity duration-500 ease-in-out transform ${
                menuOpen
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100 scale-100 pointer-events-auto"
              }`}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Quer criar algo? Me envie seu e-mail ou WhatsApp."
                className="w-full px-6 py-4 pr-28 rounded-[0.8em] border border-white/20 bg-black bg-opacity-50 text-white font-font-jakarta text-[0.9em] font-extralight placeholder-white focus:outline-none focus:ring-2"
              />
              <button
                type="submit"
                className="absolute -translate-y-1/2 bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light tracking-[0.1em] px-5 py-2 rounded-[0.8em] transition-colors duration-300 cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 transform hover:scale-105 transition-transform duration-300 relative -top-[1.7em] -right-[38.5em]"
              >
                Enviar
              </button>
            </form>

            {/* Menu */}
            <ul
  className={`absolute inset-0 flex justify-center items-center w-full bg-black bg-opacity-50 border border-white/20 relative -- rounded-[0.8em] text-white font-font-jakarta text-[0.9em] font-light px-6 py-4 gap-10 tracking-[0.1em] transition-opacity duration-500 ease-in-out transform ${
    menuOpen
      ? "opacity-100 scale-100 pointer-events-auto"
      : "opacity-0 scale-90 pointer-events-none"
  }`}
  style={{ minHeight: "3.5rem" }}
>
  {[
    { label: "Sobre mim", href: "#sobre" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ].flatMap(({ label, href }, index, arr) => {
    const item = (
      <li key={label} className="cursor-pointer select-none">
        <a
          href={href}
          className="relative text-white transform transition-all duration-500 ease-in-out hover:scale-105 
                     hover:text-transparent bg-gradient-to-r from-[#F3AD4C] via-[#FFD966] to-[#F3AD4C] bg-clip-text
                     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-[#F3AD4C] after:via-[#FFD966] after:to-[#F3AD4C] after:transition-all after:duration-500 after:ease-in-out after:w-0 hover:after:w-full"
          onClick={() =>
            typeof setMenuOpen === "function" && setMenuOpen(false)
          }
        >
          {label}
        </a>
      </li>
    );

    if (index !== arr.length - 1) {
      return [
        item,
        <span
          key={`separator-${index}`}
          className="w-0.5 h-0.5 rounded-full bg-white mx-4 inline-block"
          aria-hidden="true"
        />,
      ];
    }

    return item;
  })}
</ul>

          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderMenu;
