import React from 'react';
import ResumeTemplate1 from './ResumeTemplate1';
import ResumeTemplate2 from './ResumeTemplate2';
import ResumeTemplate3 from './ResumeTemplate3';

function TemplateSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* First Column with two templates */}
      <div
        className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg"
        onClick={() => onSelect('template1')}
      >
        <h2 className="text-lg font-semibold mb-2 text-center">Template 1</h2>
        <ResumeTemplate1 />
      </div>
      <div
        className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg"
        onClick={() => onSelect('template2')}
      >
        <h2 className="text-lg font-semibold mb-2 text-center">Template 2</h2>
        <ResumeTemplate2 />
      </div>

      {/* Second Column with Template 3 */}
      <div
        className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg"
        onClick={() => onSelect('template3')}
      >
        <h2 className="text-lg font-semibold mb-2 text-center">Template 3</h2>
        <ResumeTemplate3 />
      </div>
    </div>
  );
}

export default TemplateSelector;
