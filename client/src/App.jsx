import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';

// Importing pages and layouts
import Login from './pages/Login';
import HeroSection from './pages/student/HeroSection';
import MainLayout from './layout/MainLayout';
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Profile';
import Sidebar from './pages/admin/Sidebar';


import Dashboard from './pages/admin/Dashboard';
import CourseTable from './pages/admin/course/CourseTable';
import AddCourse from './pages/admin/course/AddCourse';
import Skill from './pages/student/Skill';
import AddButton from './components/MockInterviewSection/AddButton';
import InterviewForm from './components/MockInterviewSection/InterviewForm';
import InterviewPage from './components/MockInterviewSection/InterviewPage';
import InterviewHistory from './components/MockInterviewSection/InterviewHistory';
import EditCourse from './pages/admin/course/EditCourse';
import Card from './components/Codingpraticarea/Card';
import PythonQuiz from './components/Codingpraticarea/PythonQuiz';
import CQuiz from './components/Codingpraticarea/CQuiz';
import CPPQuiz from './components/Codingpraticarea/CppQuiz';
import JavaQuiz from './components/Codingpraticarea/JavaQuiz';
import CSharpQuiz from './components/Codingpraticarea/CSharpQuiz';
import VisualBasicQuiz from './components/Codingpraticarea/VisualBasicQuiz';
import JavaScriptQuiz from './components/Codingpraticarea/JavaScriptQuiz';
import SQLQuiz from './components/Codingpraticarea/SQLQuiz';
import PhpQuiz from './components/Codingpraticarea/PhpQuiz';
import CreateLecture from './pages/admin/lecture/CreateLecture';
import EditLecture from './pages/admin/lecture/EditLecture';
import CourseDetail from './pages/student/CourseDetail';
import CourseProgress from './pages/student/CourseProgress';
import SearchPage from './pages/student/SearchPage';
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes';
import { ThemeProvider } from './components/ThemeProvider';

import GetCompany from './pages/admin/GetCompany';
import RegisterCompany from './pages/admin/RegisterCompany';
import CompanyDetails from './pages/admin/CompanyDetails';
import PostJobForm from './pages/admin/PostJobForm';
import JobTable from './pages/admin/JobTable';
import Job from './pages/Job';

import ViewApplicants from './pages/admin/ViewApplicants';
import JobDetails from './pages/JobDetails';
import MainContent from './components/ChatBot/MainContent';
import ContextProvider from './components/ChatBot/context/Context';

import Final from './components/Resume/Final';
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute';






// Defining the routes
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: 'login',
        element: <AuthenticatedUser><Login /> </AuthenticatedUser>,
      },
      {
        path: 'my-learning',
        element: <ProtectedRoute> <MyLearning /></ProtectedRoute>,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: 'course/search',
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
      },
      {
        path: 'course-detail/:courseId',
        element: <ProtectedRoute> <CourseDetail /></ProtectedRoute>,
      },
      {
        path: 'course-progress/:courseId',
        element: <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
            <CourseProgress />
          </PurchaseCourseProtectedRoute>
        </ProtectedRoute>,

      },


      {
        path: 'skillspring',
        element: <Skill />,

      },
      {
        path: 'resume-builder',
        element: <Final />,

      },

      {

        path: '/student-chatbot',
        element: <ContextProvider><MainContent /> </ContextProvider>,
      },
      {
        path: 'interview',
        element: <AddButton />,
      },

      {
        path: "interviewForm",
        element: <InterviewForm />
      },
      {
        path: "interviewPage",
        element: <InterviewPage />
      },
      {
        path: "InterviewHistory",
        element: <InterviewHistory />

      },
      {
        path: "CordingPracticeAreas",
        element: <Card />

      },
      {
        path: "job-application-portal",
        element: <Job />
      },
      {
        path: "/description/:id",
        element: <JobDetails />
      },
      {
        path: "python-section",
        element: <PythonQuiz />

      },
      {
        path: "C-section",
        element: <CQuiz />

      },
      {
        path: "Cpp-section",
        element: <CPPQuiz />

      },
      {
        path: "Java-section",
        element: <JavaQuiz />

      },
      {
        path: "Csharp-section",
        element: <CSharpQuiz />

      },
      {
        path: "VisualBasic-section",
        element: <VisualBasicQuiz />

      },
      {
        path: "javaScript-section",
        element: <JavaScriptQuiz />

      },
      {
        path: "SQL-section",
        element: <SQLQuiz />

      },
      {
        path: "PHP-section",
        element: <PhpQuiz />

      },





      // Admin routes start from here
      {
        path: 'admin',
        element: <AdminRoute><Sidebar /></AdminRoute>,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'course',
            element: <CourseTable />,
          },
          {
            path: 'CompanyDetails',
            element: <GetCompany />,

          },
          {
            path: 'CompanyDetails/register',
            element: <RegisterCompany />,

          },
          {
            path: 'CompanyDetails/:id',
            element: <CompanyDetails />,

          },
          {
            path: 'jobDetails',
            element: <JobTable />,

          },
          {
            path: 'jobDetails/view-applicants/:id',
            element: <ViewApplicants />,
          },
          {
            path: 'jobDetails/createJob',
            element: <PostJobForm />,

          },

          {
            path: 'course/create',
            element: <AddCourse />

          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ],
      },
    ],
  },
];

// Creating the router configuration with the v7_startTransition flag
const appRouter = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true, // Enable the future flag for React Router v7
  },
});

// Main App Component
function App() {
  return (
    <main>
      <ThemeProvider><RouterProvider router={appRouter} /></ThemeProvider>

    </main>
  );
}

export default App;
