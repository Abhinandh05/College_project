import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-48 h-12 flex items-center justify-center cursor-pointer border-2 border-indigo-600 bg-black text-white rounded-full shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all duration-300"
    >
      <span className="text-3xl text-white font-bold mr-2">+</span>
      <span className="text-base text-white">Start Interview</span>
    </div>
  );
};

const HistoryButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleHistoryClick = () => {
    navigate('/interviewHistory'); // Navigate to interview history page
  };

  return (
    <div
      onClick={handleHistoryClick}
      className="w-48 h-12 flex items-center justify-center cursor-pointer border-2 border-indigo-600 bg-black text-white rounded-full shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all duration-300"
    >
      <span className="text-3xl text-white font-bold mr-2">📝</span>
      <span className="text-base text-white">View History</span>
    </div>
  );
};

const BackButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div
      onClick={handleBackClick}
      className="w-48 h-12 flex items-center justify-center cursor-pointer border-2 border-indigo-600 bg-black text-white rounded-full shadow-xl transform hover:scale-110 hover:shadow-2xl transition-all duration-300"
    >
      <span className="text-3xl text-white font-bold mr-2">←</span>
      <span className="text-base text-white">Back</span>
    </div>
  );
};

const ParentComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/interviewForm');
  };

  return (
    <div className='mt-20 text-center'>
    <h1 className="text-2xl font-bold">MockInterview</h1>

    <div className="flex items-center justify-center h-screen gap-4">
      <BackButton /> {/* Added back button */}
      <AddButton onClick={handleClick} />
      <HistoryButton /> {/* Added history button */}
    </div>
  </div>
  );
};

export default ParentComponent;
