import React, { useEffect } from 'react';

const QuestionReader = ({ question }) => {
  useEffect(() => {
    if (question) {
      // Create a new SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(question);
      // Set the language (optional, can be set to en-US or any language you want)
      utterance.lang = 'en-US';
      // Speak the question
      window.speechSynthesis.speak(utterance);
    }
  }, [question]);

  return <div className="question-container">{question}</div>;
};

export default QuestionReader;
