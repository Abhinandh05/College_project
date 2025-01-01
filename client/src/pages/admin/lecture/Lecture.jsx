import { Edit } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate();
    const goToUpdateLecture = () => {
        navigate(`${lecture._id}`);
    }

    return (
        <div className='flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2 transition-all duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-blue-900'>
            <h1 className='font-bold text-gray-800 dark:text-gray-100'>
                Lecture {index + 1} : {lecture.lectureTitle}
            </h1>
            <Edit
                size={20}
                onClick={goToUpdateLecture}
                className='cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transform transition-all duration-300 ease-in-out hover:scale-110'
            />
        </div>
    );
}

export default Lecture;
