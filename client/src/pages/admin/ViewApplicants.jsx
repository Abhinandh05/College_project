import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const ViewApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobName, setJobName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shortlistingStatus = ["Accepted", "Pending", "Rejected"];

  useEffect(() => {

    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/application/${id}/applicants`, {
          withCredentials: true,
        });
        setApplicants(response.data.job.applications || []);
        setJobName(response.data.job.name || "Unknown Job");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);

  const statusHandler = async (status, applicantId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/application/status/${applicantId}/update`,
        { status },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === applicantId
            ? { ...applicant, status: status.toLowerCase() }
            : applicant
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of applicants for {jobName}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? (
            applicants.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application.applicant?.name || "N/A"}</TableCell>
                <TableCell>{application.applicant?.email || "N/A"}</TableCell>
                <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{application.status || "Pending"}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, application._id)}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewApplicants;
