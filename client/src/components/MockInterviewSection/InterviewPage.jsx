import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebcamRecorder from './WebcamRecorder';
import { jobQuestions } from '../../data/questions';
import QuestionReader from './QuestionReader';

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate to other pages
  const interviewDetails = location.state;

  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const questions = jobQuestions[interviewDetails?.jobRole] || [];

  const handleStartInterview = () => {
    setIsRecording(true);
    setInterviewEnded(false);
    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    } else {
      setCurrentQuestion('End of interview.');
      setInterviewEnded(true);
      setIsRecording(false);
    }
  };

  const handleDownloadVideo = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'interview_video.webm';
    link.click();
  };

  const handleEndInterview = () => {
    setIsRecording(false);
    setInterviewEnded(true);

    const interviewData = {
      jobRole: interviewDetails?.jobRole,
      jobDescription: interviewDetails?.jobDescription,
      experience: interviewDetails?.experience,
      createdAt: new Date().toLocaleDateString(),
    };

    const history = JSON.parse(localStorage.getItem('interviewHistory')) || [];
    history.push(interviewData);
    localStorage.setItem('interviewHistory', JSON.stringify(history));

    navigate('/interviewForm'); // Redirect to home or history page
  };

  return (
    <div className=" mt-20 flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Interview for {interviewDetails?.jobRole}</h1>
        <p className="text-lg text-gray-600">{interviewDetails?.jobDescription}</p>
        <p className="text-lg text-gray-600">Experience: {interviewDetails?.experience} years</p>
      </div>

      {isRecording && !interviewEnded && (
        <div className="bg-gray-200 p-4 rounded-lg w-full shadow-md">
          <WebcamRecorder onVideoEnd={setVideoUrl} />
        </div>
      )}

      <div className="flex flex-col items-center mt-5 space-y-4">
        {!isRecording ? (
          <button
            onClick={handleStartInterview}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"

          >
            Start Interview
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Next Question
          </button>
        )}

        {currentQuestion && (
          <div className="mt-5 bg-gray-100 p-5 rounded-lg text-lg font-bold text-gray-700 shadow-lg w-full">
            <QuestionReader question={currentQuestion} />
          </div>
        )}

        {interviewEnded && videoUrl && (
          <button
            onClick={handleDownloadVideo}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"

          >
            Download Video
          </button>
        )}

        {interviewEnded && (
          <button
            onClick={handleEndInterview}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"

          >
            Create New Interview
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
