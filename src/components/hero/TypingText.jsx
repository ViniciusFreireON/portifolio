import { useEffect, useRef, useState } from "react";

const TypingText = ({ speed = 150 }) => {
  // Texto com estilo aplicado ao "I'm"
  const htmlFormattedText = `
    <span>Hi, </span><span class="font-extralight">I'm</span>
  `;
  const cleanText = htmlFormattedText.replace(/\s{2,}/g, " ").trim();

  const [content, setContent] = useState("");
  const indexRef = useRef(0);
  const tagBufferRef = useRef("");
  const isTagRef = useRef(false);

  useEffect(() => {
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
  }, [cleanText, speed]);

  return (
    <>
      <p
        className="text-[1.1em] font-jakarta font-extralight mb-2 relative -left-[17em] -bottom-2 bg-black/50 rounded-[0.7em] px-4 py-1 inline-block w-fit tracking-[0.2em] border border-white/20"
        dangerouslySetInnerHTML={{
          __html: content + `<span class="blink">|</span>`,
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

export default TypingText;
