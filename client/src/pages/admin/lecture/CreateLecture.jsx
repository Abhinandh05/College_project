import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi';

import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Lecture from './Lecture';

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const { courseId } = useParams(); // Destructure directly from useParams
    const navigate = useNavigate();

    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();
    const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);

    const createLectureHandler = async () => {
        try {
            if (!courseId) {
                toast.error("Course ID is missing.");
                return;
            }
            await createLecture({ lectureTitle, courseId }).unwrap();
        } catch (err) {
            console.error('Error creating lecture:', err);
            toast.error("An error occurred while creating the lecture.");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data?.message || 'Lecture created successfully!');
        }
        if (error) {
            const errorMessage = error?.data?.message || 'An error occurred while creating the lecture.';
            toast.error(errorMessage);
        }
    }, [isSuccess, error, data]);

    return (
        <div className="flex-1 mx-10">
            <div className="mb-6 animate-fade-in">
                <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                    Let's add a lecture! Provide basic details for your new lecture
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can also upload any materials like slides or videos to make the lecture more engaging for students.
                </p>
            </div>

            <div className="space-y-6 dark:text-white">
                <div className="animate-slide-up">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Enter Title Name"
                        required
                        className="transition-all duration-300 focus:ring focus:ring-blue-500 hover:shadow-md"
                    />
                </div>

                <div className="flex gap-4 items-center animate-slide-up delay-200">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="transition-transform hover:scale-105 hover:bg-gray-100"
                    >
                        Back to Course
                    </Button>

                    <Button
                        disabled={isLoading}
                        onClick={createLectureHandler}
                        className="transition-transform hover:scale-105 focus:ring focus:ring-blue-500"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            'Create Lecture'
                        )}
                    </Button>
                </div>

                <div className='mt-10 '>
                    {
                        lectureLoading ? (<p>Loading lectures...</p>) : lectureError ? (<p>Failed to load lectures</p>) : lectureData.lectures.length === 0 ? <p>No lectures available</p> : lectureData.lectures.map((lecture, index) => (
                            <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CreateLecture;
