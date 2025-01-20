import React, { useState } from 'react';

function ResumeTemplate2({ data }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-xl">
      {/* Header */}
      <header className="flex flex-col items-center mb-8">
        {/* Profile Image */}
        <div className="relative mb-4">
          <img
            src={image || data?.profilePicture || '/default-avatar.png'} // Default image if no upload
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-gray-600 text-white p-2 rounded-full cursor-pointer opacity-80 hover:opacity-100">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7-7 7 7M4 16h16M12 4v12" />
            </svg>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Name and Contact */}
        <h1 className="text-4xl font-extrabold text-white">{data?.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-200">{data?.contact || 'Phone | Email | LinkedIn'}</p>
        <p className="text-lg text-gray-200">{data?.location || 'City, Country'}</p>
      </header>

      {/* Professional Summary */}
      <section className="mb-8 bg-gray-700 text-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-100 border-b pb-2 mb-4">Professional Summary</h3>
        <p>{data?.summary || 'A brief description of your professional experience, key skills, and career goals.'}</p>
      </section>

      {/* Social Media Links */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-100 border-b pb-2 mb-4">Social Media</h3>
        <div className="space-y-2">
          <p>
            <a href={data?.social?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={data?.social?.github || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              GitHub
            </a>
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8 bg-gray-700 text-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-100 border-b pb-2 mb-4">Skills</h3>
        <div>
          <h4 className="font-semibold text-gray-100">Technical Skills</h4>
          <p>{data?.skills?.technical || 'List your technical skills here'}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold text-gray-100">Soft Skills</h4>
          <p>{data?.skills?.soft || 'List your soft skills here'}</p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-100 border-b pb-2 mb-4">Experience</h3>
        {Array.isArray(data?.experience) && data.experience.length ? (
          data.experience.map((job, index) => (
            <div key={index} className="mb-6 bg-gray-700 text-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-xl">{job.role || 'Role Title'}</h4>
              <p className="text-gray-300">{job.company || 'Company Name'} - {job.location || 'Location'}</p>
              <p className="text-sm">{job.duration || 'Duration'}</p>
              <ul className="list-disc list-inside text-gray-200 mt-2">
                {job.responsibilities?.map((task, idx) => <li key={idx}>{task}</li>) || <li>Responsibilities and achievements</li>}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-200">Add your work experience here.</p>
        )}
      </section>

      {/* Education */}
      <section className="mb-8 bg-gray-700 text-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-100 border-b pb-2 mb-4">Education</h3>
        {Array.isArray(data?.education) && data.education.length ? (
          data.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-bold text-xl">{edu.institution || 'Institution Name'}</h4>
              <p className="text-gray-300">{edu.degree || 'Degree'}</p>
              <p className="text-sm text-gray-300">{edu.details || 'Additional details (e.g., relevant courses, honors)'}</p>
              <p className="text-sm text-gray-300">{edu.location || 'Location'}, {edu.year || 'Year'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-200">Add your education details here.</p>
        )}
      </section>

      {/* Certifications */}
      <section className="mb-8 bg-gray-700 text-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-100 border-b pb-2 mb-4">Certifications</h3>
        {Array.isArray(data?.certifications) && data.certifications.length ? (
          data.certifications.map((cert, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-bold text-xl">{cert.name || 'Certification Name'}</h4>
              <p className="text-gray-300">{cert.issuer || 'Issuing Organization'}</p>
              <p className="text-sm text-gray-300">{cert.date || 'Date of Issue'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-200">Add your certifications here.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-300 pt-6">
        {data?.footer || 'Thank you for reviewing my resume.'}
      </footer>
    </div>
  );
}

export default ResumeTemplate2;
