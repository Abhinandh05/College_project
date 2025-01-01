import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('');
  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      toast.error('Please fill in both title and category.');
      return;
    }

    try {
      await createCourse({ courseTitle, category }).unwrap();
    } catch (err) {
      toast.error('Error adding course. Please try again.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'Course added successfully');
      navigate("/admin/course")
    } else if (error) {
      toast.error('Error adding course. Please try again.');
    }
  }, [isSuccess, error, data]);

  return (
    <div className="flex-1 mx-10  ">
      <div className="mb-6 animate-fade-in">
        <h1 className="font-bold text-2xl text-gray-800 dark:text-white">
          Let's add a course, add some basic course details
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add courses with title, description, instructor, duration, and difficulty to help users
          enhance skills and prepare for careers.
        </p>
      </div>

      <div className="space-y-6">
        {/* Course Title */}
        <div className="animate-slide-up">
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
            required
            className="transition-all duration-300 focus:ring focus:ring-blue-500 hover:shadow-md"
          />
        </div>

        {/* Course Category */}
        <div className="animate-slide-up delay-100">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px] transition-transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-500">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="transition-all duration-300">
              <SelectGroup>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center animate-slide-up delay-200">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/course')}
            className="transition-transform hover:scale-105 hover:bg-gray-100"
          >
            Back
          </Button>

          <Button
            disabled={isLoading || !courseTitle || !category}
            onClick={createCourseHandler}
            className="transition-transform hover:scale-105 focus:ring focus:ring-blue-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
