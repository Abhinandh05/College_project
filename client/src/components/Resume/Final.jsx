import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import ResumeEditor from './ResumeEditor';

function Final() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>
      
      {!selectedTemplate ? (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Select a Resume Template</h2>
          <TemplateSelector onSelect={handleTemplateSelect} />
        </div>
      ) : (
        <div>
          <button
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedTemplate(null)}
          >
            Back to Template Selection
          </button>
          <ResumeEditor template={selectedTemplate} />
        </div>
      )}
    </div>
  );
}

export default Final;
