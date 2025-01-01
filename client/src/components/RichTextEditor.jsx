import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput, useQuill = true }) => {
    const [value, setValue] = useState(input.Description || ''); // Initialize with the Description

    const handleChange = (content) => {
        setValue(content);
        setInput((prev) => ({ ...prev, Description: content })); // Update parent state
    };

    if (useQuill) {
        // ReactQuill-based editor
        return (
            <ReactQuill
                theme="snow"
                value={input.Description} // Sync with parent state
                onChange={handleChange} // Update parent state
                placeholder="Write a description..."
            />
        );
    } else {
        // Textarea-based editor
        return (
            <div>
                <textarea
                    value={value} // Controlled by local state
                    onChange={(e) => handleChange(e.target.value)} // Update state and parent
                    placeholder="Write a description..."
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
        );
    }
};

export default RichTextEditor;
