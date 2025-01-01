import React, { useState, useEffect } from "react";
import PhpQuestions from "../../data/PhpQuestions";

const PhpQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(PhpQuestions.map(() => ""));
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(PhpQuestions.map(() => null));
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleTimeOut = () => {
    setFeedback("⏰ Time's up! Moving to the next question.");
    setTimeout(() => setFeedback(""), 3000);
    navigateQuestion(Math.min(currentQuestionIndex + 1, PhpQuestions.length - 1));
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = PhpQuestions[currentQuestionIndex];
    const isCorrect =
      answers[currentQuestionIndex].trim().toLowerCase() ===
      currentQuestion.correctAnswer.toLowerCase();

    const newAttempts = [...attempts];
    newAttempts[currentQuestionIndex] = isCorrect;
    setAttempts(newAttempts);

    setFeedback(isCorrect ? "✅ Correct! Well done!" : "❌ Incorrect. Try again!");
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const navigateQuestion = (index) => {
    setFeedback("");
    setTimeLeft(60); // Reset timer for new question
    setCurrentQuestionIndex(index);
  };

  const getAttemptStatus = (index) => {
    if (attempts[index] === true) return "bg-green-500";
    if (attempts[index] === false) return "bg-red-500";
    return "bg-gray-300";
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-yellow-400 hover:animate-bounce">
          PHP Programming Quiz
        </h1>
        <div className="flex items-center space-x-6">
          <span className="text-gray-400 text-sm">
            Question {currentQuestionIndex + 1}/{PhpQuestions.length}
          </span>
          <div
            className={`text-lg font-bold transition-all duration-300 ${
              timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-yellow-400"
            }`}
          >
            ⏱ {timeLeft}s
          </div>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 overflow-y-auto border-r border-gray-700 shadow-lg">
          <h2 className="text-lg font-semibold text-center py-4 border-b border-gray-700 text-yellow-400">
            Questions
          </h2>
          <ul>
            {PhpQuestions.map((_, index) => (
              <li
                key={index}
                onClick={() => navigateQuestion(index)}
                className={`cursor-pointer px-4 py-2 flex items-center justify-between hover:bg-gray-700 transition-colors duration-300 ${
                  currentQuestionIndex === index ? "bg-blue-600" : ""
                }`}
              >
                <span>Q{index + 1}</span>
                <span className={`w-3 h-3 rounded-full ${getAttemptStatus(index)}`}></span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/5 flex flex-col p-6 space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col space-y-4 transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-xl font-bold text-yellow-400">
              {PhpQuestions[currentQuestionIndex].question}
            </h2>
            <textarea
              className="w-full h-48 p-4 bg-gray-700 text-gray-200 rounded font-mono resize-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
              placeholder="Type your answer here..."
              value={answers[currentQuestionIndex]}
              onChange={handleAnswerChange}
            ></textarea>
            <div className="flex space-x-4">
              <button
                onClick={handleAnswerSubmit}
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600 transform transition-transform hover:scale-105"
              >
                Submit
              </button>
              <button
                onClick={() =>
                  navigateQuestion(
                    Math.min(currentQuestionIndex + 1, PhpQuestions.length - 1)
                  )
                }
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transform transition-transform hover:scale-105"
              >
                Next
              </button>
              <button
                onClick={() =>
                  navigateQuestion(Math.max(currentQuestionIndex - 1, 0))
                }
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transform transition-transform hover:scale-105"
              >
                Previous
              </button>
            </div>
          </div>
          {feedback && (
            <div
              className={`p-4 rounded text-center transition-all duration-500 ${feedback.includes("✅") ? "bg-green-700 text-green-200" : feedback.includes("⏰") ? "bg-yellow-700 text-yellow-200" : "bg-red-700 text-red-200"
                }`}
            >
              {feedback}
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/5 bg-gray-800 border-l border-gray-700 p-4">
          <h2 className="text-lg font-semibold text-center mb-4 text-yellow-400">
            Feedback
          </h2>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            {feedback ? (
              <p>{feedback}</p>
            ) : (
              <p className="text-gray-400">Submit an answer to see feedback.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PhpQuiz;
