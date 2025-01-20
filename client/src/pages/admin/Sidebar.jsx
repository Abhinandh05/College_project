import { ChartNoAxesColumn, SquareLibrary, Briefcase, Building } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 sticky top-0 h-screen text-gray-900 dark:text-white">
        <div className="my-20 space-y-4">
          <Link
            to="dashboard"
            className="flex items-center gap-2 p-3 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <ChartNoAxesColumn size={22} />
            <h1 className="font-medium">Dashboard</h1>
          </Link>
          <Link
            to="course"
            className="flex items-center gap-2 p-3 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <SquareLibrary size={22} />
            <h1 className="font-medium">Courses</h1>
          </Link>
          <Link
            to="CompanyDetails"
            className="flex items-center gap-2 p-3 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Building size={22} />
            <h1 className="font-medium">Company</h1>
          </Link>
          <Link
            to="jobDetails"
            className="flex items-center gap-2 p-3 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Briefcase size={22} />
            <h1 className="font-medium">Job</h1>
          </Link>
        
         
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 md:p-24 p-2 bg-white dark:bg-gray-900 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
