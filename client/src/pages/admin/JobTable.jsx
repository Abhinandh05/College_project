import React, { useEffect, useState } from "react";
import axios from "axios";
// Assuming you have a Button component
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Format the date to only show the date portion (e.g., "January 4, 2025")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will display the date in the user's locale format
  };

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/job/get", {
        withCredentials: true, // Ensure credentials are sent if needed
      });

      if (response.data.success) {
        setJobs(response.data.jobs); // Assuming response contains an array of jobs
      } else {
        toast.error(response.data.message || "Failed to fetch jobs.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 relative">
      {/* Button added to top-right corner */}
      <div className="text-right">
  <Button
    variant="outline"
    className="mb-4 bg-gray-800 hover:bg-gray-500 text-white rounded-md px-4 py-2 shadow-lg transition-transform transform hover:scale-105"
    onClick={() => navigate("createJob")} // Define action here
  >
    New Job
  </Button>
</div>
      
      <h1 className="font-bold text-2xl mb-4">Job Listings</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-200 text-left">Company</th>
              <th className="px-4 py-2 border border-gray-200 text-left">Role</th>
              <th className="px-4 py-2 border border-gray-200 text-left">Date</th>
              <th className="px-4 py-2 border border-gray-200 text-left text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-200">{job.company.name}</td>
                  <td className="px-4 py-2 border border-gray-200">{job.title}</td>
                  <td className="px-4 py-2 border border-gray-200 ">{formatDate(job.createdAt)}</td>
                  <td className="px-4 py-2 border border-gray-200 text-right">
                  <Button
                      variant="outline"
                      onClick={() => navigate(`view-applicants/${job._id}`)} // Navigate to job applicants page
                    >
                      Applicants
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
