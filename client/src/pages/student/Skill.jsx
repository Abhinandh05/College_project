import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Skill = () => {
  const cards = [
    {
      heading: "Resume Builder",
      paragraph: "A user-friendly interface to create and customize professional resumes with helpful templates and tips.", 
      path: "/resume-builder", 
    },
    {
      heading: "Coding Practice Area",
      paragraph: "An interactive environment for practicing coding problems, tracking progress to enhance skills.",
      path: "/CordingPracticeAreas",  
    },
    {
      heading: "Mock Interview Section",
      paragraph: "Prepare for interviews with AI-driven questions tailored to your career goals.",
      path: "/interview",
    },
    {
      heading: "Student Chatbot",
      paragraph: "An AI chatbot available 24/7 to assist with academic queries, resource recommendations, and FAQs.",
      path: "/student-chatbot", 
    },
    {
      heading: "Job Application Portal",
      paragraph: "A platform for searching jobs, directly applying with integrated resume submission.",
      path: "/job-application-portal", 
    },
  ];

  return (
    <div className="mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Skillspring</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link to={card.path} key={index}>
            <Card
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Highlight Border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-xl hover:border-indigo-500 transition-all duration-300"></div>

              {/* Card Content */}
              <div className="p-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                    {card.heading}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mt-3 text-gray-600">
                    {card.paragraph}
                  </p>
                </CardContent>
              </div>

              {/* Decorative Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:h-2 transition-all duration-300"></div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Skill;
