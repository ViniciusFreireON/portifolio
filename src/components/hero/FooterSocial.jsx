const FooterSocial = ({ visible }) => {
  return (
    <div
      className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity transition-transform duration-700 ease-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <p className="text-[0.8em] font-jakarta font-extralight mb-3 tracking-[0.2em] text-center">
        Bem-vindo ao meu portifólio.
      </p>

      <div className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] bg-[rgba(34,34,34,0.5)] rounded-[2em] p-3 px-[2em] inline-flex gap-10 border border-white/20">
        <a
          href="https://www.instagram.com/_vinifreire.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#141414] rounded-full p-3 
            transform transition-transform duration-300 hover:scale-110"
        >
          <img
            src="/assets/instagram.png"
            alt="Instagram"
            className="w-6 h-6"
          />
        </a>
        <a
          href="https://github.com/ViniciusFreireON"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#141414] rounded-full p-4 
            transform transition-transform duration-300 hover:scale-110"
        >
          <img src="/assets/github.png" alt="GitHub" className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/vinícius-freire-066884375"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#141414] rounded-full p-3 
            transform transition-transform duration-300 hover:scale-110"
        >
          <img
            src="/assets/linkedin.png"
            alt="LinkedIn"
            className="w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
};

export default FooterSocial;
