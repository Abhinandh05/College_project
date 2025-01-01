import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    jobRole: '',
    customJobRole: '',
    jobDescription: '',
    experience: '',
  });

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const jobRoles = [
    'MERN Stack Developer',
    'MEAN Stack Developer',
    'Java Developer',
    'UI/UX Designer',
    'Cloud Computing',
    'Machine Learning Engineer',
    'Data Scientist',
    'DevOps Engineer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedRole = formData.jobRole === 'Custom' ? formData.customJobRole : formData.jobRole;

    if (!selectedRole || !formData.jobDescription || !formData.experience) {
      alert('Please fill out all fields');
      return;
    }

    const details = {
      jobRole: selectedRole,
      jobDescription: formData.jobDescription,
      experience: formData.experience,
    };

    if (onSubmit) onSubmit(details);

    navigate('/interviewPage', { state: details });

    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50 transition-opacity duration-300 mt-20">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-2xl transform scale-95 transition-transform duration-300" style={{ animation: 'slideIn 0.5s ease-in-out forwards' }}>
        {onClose && (
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-400 focus:outline-none" onClick={onClose}>
            ✖
          </button>
        )}

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Interview</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="field">
            <label htmlFor="jobRole" className="block text-gray-800 mb-1">Job Role / Position</label>
            <select
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Job Role</option>
              {jobRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
              <option value="Custom">Custom Role</option>
            </select>
          </div>

          {formData.jobRole === 'Custom' && (
            <div className="field">
              <label htmlFor="customJobRole" className="block text-gray-800 mb-1">Enter Custom Job Role</label>
              <input
                type="text"
                id="customJobRole"
                name="customJobRole"
                value={formData.customJobRole}
                onChange={handleChange}
                placeholder="e.g., AI Specialist"
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="jobDescription" className="block text-gray-800 mb-1">Job Description / Tech Stack</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Briefly describe the job and tech stack"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div className="field">
            <label htmlFor="experience" className="block text-gray-800 mb-1">Years of Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 3"
              min="0"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            {onClose && (
              <button
                type="button"
                className="px-6 py-3 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleBackClick}
              type="submit"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            >
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewForm;
