import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Importing the Star icon

const Card = () => {
  const languages = [
    {
      name: "Python",
      path: "/python-section",
      courseLevel: "Beginner",
      items: 50,
      progress: 20,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    },
    {
      name: "C",
      path: "/C-section",
      courseLevel: "Beginner",
      items: 40,
      progress: 50,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
    },
    {
      name: "C++",
      path: "/Cpp-section",
      courseLevel: "Advanced",
      items: 60,
      progress: 70,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    },
    {
      name: "Java",
      path: "/Java-section",
      courseLevel: "Beginner",
      items: 75,
      progress: 40,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    },
    {
      name: "C#",
      path: "/Csharp-section",
      courseLevel: "Medium",
      items: 45,
      progress: 30,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png",
    },
    {
      name: "Visual Basic .NET",
      path: "/VisualBasic-section",
      courseLevel: "Advanced",
      items: 35,
      progress: 10,
      backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRDxAu6-VkVOewGOLTZBpIisWAtiweYBZdA&s",
    },
    {
      name: "JavaScript",
      path: "/javaScript-section",
      courseLevel: "Beginner",
      items: 100,
      progress: 60,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
    },
    {
      name: "SQL",
      path: "/SQL-section",
      courseLevel: "Beginner",
      items: 90,
      progress: 80,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
    },
    {
      name: "PHP",
      path: "/PHP-section",
      courseLevel: "Medium",
      items: 70,
      progress: 50,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
    },
  ];

  return (
    <div className="p-8 mt-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-200">
        Coding Practice Area
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {languages.map((language, index) => (
          <Link key={index} to={language.path}>
            <div
              className="relative bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{
                backgroundImage: `url(${language.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px", // Reduced card height
                width: "100%", // Ensures responsiveness
              }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>

              {/* Card Content */}
              <div className="relative p-4 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{language.name}</h3>
                  <p className="mt-1 text-sm text-gray-200">Explore coding problems for {language.name}.</p>
                </div>
                {/* Card Footer */}
                <div className="bg-white rounded-b-xl p-3 flex justify-between items-center text-gray-800">
                  <div>
                    <p className="text-sm">course level: {language.courseLevel}</p>
                    <p className="text-sm">Items: {language.items}</p>
                  </div>
                  <button className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-600">
                    <FaStar className="text-yellow-400 text-lg mr-1" />
                    Start
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Card;
