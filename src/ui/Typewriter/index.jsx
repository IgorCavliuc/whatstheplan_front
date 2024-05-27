import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startLanguage, setStartLanguage] = useState("");

  useEffect(() => {
    setStartLanguage(localStorage.getItem("lang"));
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      if (startLanguage !== localStorage.getItem("lang")) {
        setCurrentText("");
        setCurrentIndex(0);
        setStartLanguage(localStorage.getItem("lang"));
        return () => clearTimeout(timeout);
      }
      return () => clearTimeout(timeout);
    }
  }, [startLanguage, currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

export default Typewriter;
