import { useEffect, useRef, useState } from "react";

const TypingText = ({ text = "", speed = 150 }) => {
  const cleanText = text.replace(/\s{2,}/g, " ").trim();

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
        className="text-[0.9em] font-jakarta font-extralight mb-10 relative -bottom-[6.5em] -right-[0.5em] tracking-[0.2em]"
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
