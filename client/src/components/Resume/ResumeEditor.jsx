import React, { useState } from 'react';
import ResumeTemplate1 from './ResumeTemplate1';
import ResumeTemplate2 from './ResumeTemplate2';
import html2pdf from 'html2pdf.js';


function ResumeEditor({ template }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    contact: '',
    experience: '',
    education: '',
    skills: '',
    location: '',
    summary: '',
    softSkills: '',  // Soft skills field
    social: {
      linkedin: '',
      github: '',
    },
    certifications: [{ name: '', issuer: '', date: '' }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCertificationChange = (index, e) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index][e.target.name] = e.target.value;
    setFormData({ ...formData, certifications: newCertifications });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, { name: '', issuer: '', date: '' }],
    });
  };

  const handleDownload = () => {
    const element = document.getElementById('resume');
    html2pdf().from(element).save('resume.pdf');
  };

  const renderTemplate = () => {
    if (template === 'template1') return <ResumeTemplate1 data={formData} />;
    if (template === 'template2') return <ResumeTemplate2 data={formData} />;
  };

  return (
    <div className="space-y-4">
      <form className="grid grid-cols-2 gap-4">
        {['name', 'title', 'contact', 'experience', 'education', 'skills', 'location', 'summary'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        ))}

        {/* Soft Skills */}
        <textarea
          name="softSkills"
          placeholder="Soft Skills"
          value={formData.softSkills}
          onChange={handleChange}
          className="border rounded-lg p-2 col-span-2"
        />

        {/* Social Media Links */}
        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.social.linkedin}
          onChange={(e) => setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })}
          className="border rounded-lg p-2"
        />
        <input
          name="github"
          placeholder="GitHub URL"
          value={formData.social.github}
          onChange={(e) => setFormData({ ...formData, social: { ...formData.social, github: e.target.value } })}
          className="border rounded-lg p-2"
        />

        {/* Certifications */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold text-gray-100">Certifications</h3>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <input
                name="name"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => handleCertificationChange(index, e)}
                className="border rounded-lg p-2"
              />
              <input
                name="issuer"
                placeholder="Issuer"
                value={cert.issuer}
                onChange={(e) => handleCertificationChange(index, e)}
                className="border rounded-lg p-2"
              />
              <input
                name="date"
                placeholder="Date of Issue"
                value={cert.date}
                onChange={(e) => handleCertificationChange(index, e)}
                className="border rounded-lg p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addCertification}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Certification
          </button>
        </div>
      </form>

      <div className="border rounded-lg p-4 bg-white" id="resume">
        {renderTemplate()}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleDownload}
      >
        Download Resume
      </button>
    </div>
  );
}

export default ResumeEditor;
