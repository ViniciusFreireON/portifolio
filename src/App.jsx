import { useEffect, useRef } from "react";
import "./App.css";
import Sobre from "./components/Sobre";
import Habilidades from "./components/habilidades";
import Projetos from "./components/Projetos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import Hero from "./components/Hero";



function App() {
  const bgRef = useRef(null);
  return (
    <>
      <div
        className="overflow-x-hidden overflow-y-auto select-none"
        
      >
        <Hero />
        <Sobre />
        <Habilidades />
        <Projetos />
        <Contato />
        <Footer />
      </div>
    </>
  );
}

export default App;
