import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  return (
    <div className='flex-1 '>

      <div className='flex  items-center justify-between mb-5'>

        <h1 className='font-bold text-2xl dark:text-white'>Add details information regarding course</h1>

        <Link to="lecture">

          <Button 
          className='hover:text-blue-600 dark:hover:text-blue-400'
          variant={'link'}>Go to lectures page</Button>
        </Link>

      </div>
       
       <div>
        <CourseTab/>
       </div>


    </div>
  )
}

export default EditCourse
