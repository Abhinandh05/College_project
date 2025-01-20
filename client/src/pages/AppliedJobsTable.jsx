import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AppliedJobsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/application/get", {
          withCredentials: true, // Include cookies if required
        });
        setApplications(response.data.application);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-xl">
    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 text-center">
      Applied Jobs
    </h2>
    <Table className="min-w-full table-auto text-gray-700">
      <TableCaption className="text-xl font-semibold text-gray-600">A list of your applied jobs</TableCaption>
      <TableHeader>
        <TableRow className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 transition-all duration-300">
          <TableHead className="py-2 px-4 text-left">Date</TableHead>
          <TableHead className="py-2 px-4 text-left">Job Role</TableHead>
          <TableHead className="py-2 px-4 text-left">Company</TableHead>
          <TableHead className="py-2 px-4 text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length <= 0 ? (
          <TableRow>
            <TableCell colSpan="4" className="py-2 text-center text-gray-500">
              You haven't applied to any jobs yet.
            </TableCell>
          </TableRow>
        ) : (
          applications.map((application) => (
            <TableRow
              key={application._id}
              className="hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              <TableCell className="py-2 px-4">{new Date(application.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="py-2 px-4">{application.job?.title || "N/A"}</TableCell>
              <TableCell className="py-2 px-4">{application.job.company?.name || "N/A"}</TableCell>
              <TableCell className="py-2 px-4 text-right">
                <span
                  className={`${
                    application.status === "accepted"
                      ? "bg-green-400"
                      : application.status === "rejected"
                      ? "bg-red-400"
                      : "bg-gray-400"
                  } text-white py-1 px-3 rounded-full transition-all duration-300 transform hover:scale-110`}
                >
                  {application.status.toUpperCase()}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>    
  );
};

export default AppliedJobsTable;
