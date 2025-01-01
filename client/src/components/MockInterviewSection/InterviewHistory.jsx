import React, { useState, useEffect } from 'react';

const InterviewHistory = () => {
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(''); // State for feedback input
  const [selectedIndex, setSelectedIndex] = useState(null); // To track which interview is selected for feedback
  const [editing, setEditing] = useState(false); // State to check if feedback is being edited

  // Fetch history from localStorage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('interviewHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Save feedback to the history and update localStorage
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSaveFeedback = (index) => {
    const updatedHistory = [...history];
    updatedHistory[index].feedback = feedback; // Add feedback to the selected interview
    setHistory(updatedHistory);
    localStorage.setItem('interviewHistory', JSON.stringify(updatedHistory));
    setSelectedIndex(null); // Clear the selected index after saving feedback
    setFeedback(''); // Reset feedback input
    setEditing(false); // Reset editing state
  };

  const handleEditFeedback = (index) => {
    setSelectedIndex(index);
    setFeedback(history[index].feedback); // Pre-fill the textarea with current feedback
    setEditing(true); // Set editing to true
  };

  const handleBackButton = () => {
    window.history.back(); // Goes back to the previous page
  };

  // Fixed background image URL for all cards
  const backgroundImageURL =
    'https://thumbs.dreamstime.com/b/history-word-concept-wooden-sign-hanging-rope-yellow-background-business-137037604.jpg'; // Replace with a suitable image URL

  return (
    <div className="flex flex-col p-6 mt-20 items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Interview History</h1> {/* Updated heading */}

      <div className="flex flex-wrap justify-center gap-4 flex-grow">
        {history.length > 0 ? (
          history.map((interview, index) => (
            <div
              key={index}
              className="max-w-xs h-80 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{
                height: '320px',
                width: '300px',
                backgroundImage: `url(${backgroundImageURL})`, // Constant background image for all cards
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Semi-transparent overlay for card content */}
              <div className="bg-black bg-opacity-60 h-full w-full p-4 rounded-lg text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">{interview.jobRole}</h3>
                  <p>{interview.jobDescription}</p>
                  <p>Experience: {interview.experience} years</p>
                  <p>Date: {interview.createdAt}</p>
                </div>

                {/* Feedback section */}
                {selectedIndex === index ? (
                  <div className="mt-4">
                    <textarea
                      value={feedback}
                      onChange={handleFeedbackChange}
                      className="w-full p-2 border rounded-lg text-black"
                      placeholder="Write your feedback here"
                      rows="4"
                    />
                    <button
                      onClick={() => handleSaveFeedback(index)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
                    >
                      Save Feedback
                    </button>
                  </div>
                ) : interview.feedback ? (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Feedback:</h4>
                    <p>{interview.feedback}</p>
                    <button
                      onClick={() => handleEditFeedback(index)}
                      className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm"
                    >
                      Edit Feedback
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedIndex(index)}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm"
                  >
                    Add Feedback
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">No interviews found.</p>
        )}
      </div>

      <div>
        {/* Back Button */}
        <button
          type="button"
          className="px-6 py-3 bg-gray-800 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white mt-6 text-center"
          onClick={handleBackButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InterviewHistory;
