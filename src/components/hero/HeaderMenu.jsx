import { useState, useEffect } from "react";
import { db } from "/src/firebase/firebase"; // importa seu firebase.js
import { collection, addDoc, Timestamp } from "firebase/firestore"; // <-- adicionei o Timestamp aqui

const HeaderMenu = () => {
  const [navVisible, setNavVisible] = useState(false);
  const [leftBtnVisible, setLeftBtnVisible] = useState(false);
  const [rightBtnVisible, setRightBtnVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // estados do formulário
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => setLeftBtnVisible(true), 200);
    setTimeout(() => setRightBtnVisible(true), 400);
    setTimeout(() => setNavVisible(true), 600);
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  // enviar para o Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        contato: inputValue,
        createdAt: Timestamp.now(), // <-- aqui coloquei o Timestamp do Firestore
      });
      setSuccess(true);
      setInputValue("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao salvar no Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header id="menu" className="w-full fixed top-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Botão WhatsApp à esquerda */}
        <a
          href="https://wa.me/5571981391485?text=Ol%C3%A1%21%20Sou%20dev%20Fullstack..."
          className={`
            flex items-center gap-2 bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light tracking-[0.1em] px-5 py-2 rounded-[0.8em] 
            transition-all duration-700 ease-out cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 z-50
            transform hover:scale-105 sm:mx-0 mx-auto
            ${
              leftBtnVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-[-20px] scale-95"
            }
          `}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <img src="/assets/whatsapp.png" alt="Ícone" className="w-4 h-4" />
          <span>Fale comigo</span>
        </a>

        {/* Nav central */}
        <nav
          className={`flex-1 flex justify-center transition-all duration-700 ease-out mx-4 max-w-2xl sm:block hidden ${
            navVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          {/* Form */}
          <form
            className={`w-full transition-opacity duration-500 ease-in-out transform ${
              menuOpen
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100 pointer-events-auto"
            } hidden sm:block`}
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Quer criar algo? Me envie seu e-mail ou WhatsApp."
                className="w-full px-6 py-4 pr-32 rounded-[0.8em] border border-white/20 bg-black bg-opacity-50 text-white font-font-jakarta text-[0.9em] font-extralight placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#F3AD4C]/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[0.9em] font-light tracking-[0.1em] px-4 py-1.5 rounded-[0.6em] transition-colors duration-300 cursor-pointer drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 transform hover:scale-105"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
            {success && (
              <p className="text-green-400 text-sm mt-2">✅ Contato salvo!</p>
            )}
          </form>

          {/* Menu */}
          <ul
            className={`absolute top-full left-0 right-0 flex flex-col sm:flex-row justify-center items-center bg-black bg-opacity-95 border border-white/20 rounded-[0.8em] text-white font-font-jakarta text-[0.9em] font-light px-6 py-4 gap-6 sm:gap-10 tracking-[0.1em] transition-all duration-500 ease-in-out transform mt-2 ${
              menuOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none hidden"
            }`}
          >
            {[
              { label: "Sobre mim", href: "#sobre" },
              { label: "Habilidades", href: "#habilidades" },
              { label: "Projetos", href: "#projetos" },
              { label: "Contato", href: "#contato" },
            ].map(({ label, href }, i, arr) => (
              <div key={label} className="flex items-center">
                <li className="cursor-pointer select-none">
                  <a
                    href={href}
                    className="relative text-white transition-all hover:scale-105 hover:text-transparent bg-gradient-to-r from-[#F3AD4C] via-[#FFD966] to-[#F3AD4C] bg-clip-text after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-[#F3AD4C] after:via-[#FFD966] after:to-[#F3AD4C] after:w-0 hover:after:w-full after:transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
                {i !== arr.length - 1 && (
                  <span className="w-0.5 h-0.5 rounded-full bg-white/60 mx-4 hidden sm:inline-block" />
                )}
              </div>
            ))}
          </ul>
        </nav>

        {/* Botão Menu à direita */}
        <a
          href="#menu"
          onClick={toggleMenu}
          className={`
            flex items-center justify-center bg-gradient-to-r from-[#0A0B0C] to-[#171717] text-white font-font-jakarta text-[1em] font-light tracking-[0.1em] py-2 rounded-[0.8em] 
            drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] border border-white/20 z-50
            transform hover:scale-105 transition-all duration-300 cursor-pointer
            transition-width duration-500 ease-in-out sm:block hidden
            ${menuOpen ? "w-12 px-0" : "w-[7rem] px-5"}
            ${
              rightBtnVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-10 scale-95"
            }
          `}
        >
          <div
            className={`relative h-[1.5rem] flex items-center justify-center transition-all duration-500 ease-in-out ${
              menuOpen ? "w-6" : "w-[5.5rem]"
            }`}
          >
            {/* Texto + barras */}
            <div
              className={`absolute inset-0 flex items-center gap-2 justify-center transition-opacity duration-500 ${
                menuOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            >
              <span className="relative -left-[0.5em]">Menu</span>
              <div className="flex flex-col gap-[2px] relative -left-[0.5em]">
                <span className="block w-6 h-[2px] bg-white rounded-full"></span>
                <span className="block w-6 h-[2px] bg-white rounded-full"></span>
              </div>
            </div>

            {/* Ícone X */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </header>
  );
};

export default HeaderMenu;
