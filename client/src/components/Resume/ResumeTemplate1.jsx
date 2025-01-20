import React from 'react';

function ResumeTemplate1({ data }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-gray-800 shadow-lg rounded-md">
      {/* Header */}
      <header className="text-center border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">{data?.name || 'Your Name'}</h1>
        <p className="text-gray-600">{data?.contact || 'Phone | Email | LinkedIn'}</p>
        <p className="text-gray-600">{data?.location || 'City, Country'}</p>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2">Professional Summary</h3>
        <p>{data?.summary || 'A brief description of your professional experience, key skills, and career goals.'}</p>
      </section>

      {/* Social Media Links (Middle Placement) */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2">Social Media</h3>
        <div>
          <p>
            <a href={data?.social?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={data?.social?.github || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2">Skills</h3>
        <div>
          <h4 className="font-semibold">Technical Skills</h4>
          <p>{data?.skills?.technical || 'List your technical skills here'}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Soft Skills</h4>
          <p>{data?.skills?.soft || 'List your soft skills here'}</p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2">Experience</h3>
        {data?.experience?.length ? (
          data.experience.map((job, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-bold">{job.role || 'Role Title'}</h4>
              <p className="text-gray-600">{job.company || 'Company Name'} - {job.location || 'Location'}</p>
              <p className="text-sm">{job.duration || 'Duration'}</p>
              <ul className="list-disc list-inside text-gray-700">
                {job.responsibilities?.map((task, idx) => <li key={idx}>{task}</li>) || <li>Responsibilities and achievements</li>}
              </ul>
            </div>
          ))
        ) : (
          <p>Add your work experience here.</p>
        )}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2">Education</h3>
        {data?.education?.length ? (
          data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-bold">{edu.institution || 'Institution Name'}</h4>
              <p className="text-gray-600">{edu.degree || 'Degree'}</p>
              <p className="text-sm">{edu.details || 'Additional details (e.g., relevant courses, honors)'}</p>
              <p className="text-sm">{edu.location || 'Location'}, {edu.year || 'Year'}</p>
            </div>
          ))
        ) : (
          <p>Add your education details here.</p>
        )}
      </section>

      {/* Certifications */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2">Certifications</h3>
        {data?.certifications?.length ? (
          data.certifications.map((cert, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-bold">{cert.name || 'Certification Name'}</h4>
              <p className="text-gray-600">{cert.issuer || 'Issuing Organization'}</p>
              <p className="text-sm">{cert.date || 'Date of Issue'}</p>
            </div>
          ))
        ) : (
          <p>Add your certifications here.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t pt-4">
        {data?.footer || 'Thank you for reviewing my resume.'}
      </footer>
    </div>
  );
}

export default ResumeTemplate1;
