import { useState, useEffect } from "react";

const useTypingPlaceholder = (
  placeholders: string[],
  typingSpeed = 100,
  deletingSpeed = 100,
  delayBetweenPhrases = 4000
) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (typing) {
        if (charIndex < placeholders[placeholderIndex].length) {
          setDisplayedPlaceholder(
            (prev) => prev + placeholders[placeholderIndex][charIndex]
          );
          setCharIndex(charIndex + 1);
          timeout = setTimeout(type, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setTyping(false);
          }, delayBetweenPhrases); // Delay before starting to delete
        }
      } else {
        if (charIndex > 0) {
          setDisplayedPlaceholder((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
          timeout = setTimeout(type, deletingSpeed);
        } else {
          timeout = setTimeout(() => {
            setTyping(true);
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          }, typingSpeed); // Small delay before starting to type next phrase
        }
      }
    };

    timeout = setTimeout(type, typing ? typingSpeed : deletingSpeed);

    return () => clearTimeout(timeout);
  }, [
    typing,
    charIndex,
    placeholders,
    placeholderIndex,
    typingSpeed,
    deletingSpeed,
    delayBetweenPhrases,
  ]);

  return displayedPlaceholder;
};

export default useTypingPlaceholder;
