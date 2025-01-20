import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
  const {
    courseTitle,
    courseThumbnail,
    courseLevel,
    coursePrice,
    creator = {},
  } = course;

  return (
    <Link to={`/course-detail/${course._id}`}>
       <Card className='overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300'>
      <div className='relative'>
        <img
          src={courseThumbnail || 'https://via.placeholder.com/150'}
          alt={courseTitle || 'Course Thumbnail'}
          className='w-full h-36 object-cover rounded-t-lg'
        />
      </div>
      <CardContent className='px-5 py-4 space-y-3 '>
        <h1 className='hover:underline font-bold text-lg truncate'>{courseTitle || 'Untitled Course'}</h1>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className="h-8 w-8">
              <AvatarImage src={creator?.photoUrl || "https://res.cloudinary.com/duzqm4jmh/image/upload/v1736052193/rchy6kcoscwucrtivyxq.jpg"} alt={creator.name || "Creator"} />
              <AvatarFallback>{(creator?.name || 'Abhinandh')[0]}</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>{creator?.name || 'Abhinandh'}</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-sm rounded-full'}>
            {courseLevel || 'Unknown Level'}
          </Badge>    
        </div>
        <div className='text-lg font-bold'>
          <span>₹{coursePrice || '0'}</span>
        </div>
      </CardContent>
    </Card>

    </Link>
   
  );
};

export default Course;
