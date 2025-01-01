import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { useGetCreatorCoursesQuery } from '@/features/api/courseApi';
import { Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CourseTable = () => {
  const { data, isLoading, isError, error } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error.message || "Something went wrong!"}</h1>;

  const courses = data?.courses || [];

  if (courses.length === 0) {
    return (
      <div className="p-4">
        <h1>No courses available. Create your first course!</h1>
        <Button
          onClick={() => navigate('create')}
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-4 py-2 shadow-lg transition-transform transform hover:scale-105"
        >
          Create New Course
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Button
        onClick={() => navigate('create')}
        className="mb-4 bg-gray-800 hover:bg-gray-500 text-white rounded-md px-4 py-2 shadow-lg transition-transform transform hover:scale-105"
      >
        Create New Course
      </Button>

      <Table className="border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <TableCaption className="text-gray-600 dark:text-gray-400">A list of your created courses.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="px-4 py-2 text-left">Price</TableHead>
            <TableHead className="px-4 py-2 text-left">Status</TableHead>
            <TableHead className="px-4 py-2 text-left">Course Title</TableHead>
            <TableHead className="px-4 py-2 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course._id}
              className="group hover:bg-indigo-50 transition-all duration-300 ease-in-out dark:hover:bg-gray-800"
            >
              <TableCell className="px-4 py-2 font-medium text-gray-800 group-hover:text-indigo-700 dark:text-gray-100">
              ₹{course?.coursePrice || "N/A"}
              </TableCell>
              <TableCell className="px-4 py-2 group-hover:text-indigo-700 dark:text-gray-100 ">
                <Badge>{course.isPublished ? "Published" : "Unpublished"}</Badge>
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700 group-hover:text-indigo-700 dark:text-gray-100">
                {course.courseTitle}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                <div className="flex justify-end">
                  <Button
                  
                    variant="ghost"
                    onClick={() => navigate(`${course._id}`)}
                    className="flex items-center text-gray-800 hover:text-indigo-600 transition-transform transform group-hover:scale-110 dark:text-gray-100"
                  >
                    <Edit className="mr-1 dark:text-gray-400" /> Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
