import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState('');
    const [isApplied, setIsApplied] = useState(false);

    // Load the applied status from localStorage or API when the component mounts
    useEffect(() => {
        const storedApplicationStatus = localStorage.getItem(`isApplied-${id}`);
        if (storedApplicationStatus === 'true') {
            setIsApplied(true);
        }
    }, [id]);

    // Fetch job details from the API
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/job/get/${id}`, { withCredentials: true });
                if (response.data.success) {
                    setJob(response.data.job);
                    setIsApplied(response.data.job.isApplied || isApplied);
                }
            } catch (err) {
                setError('Failed to fetch job details.');
                toast.error('Error fetching job details. Please try again.');
            }
        };

        fetchJobDetails();
    }, [id, isApplied]);

    const applyJobHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/application/apply/${id}`, { withCredentials: true });
            if (response.data.success) {
                setIsApplied(true);
                localStorage.setItem(`isApplied-${id}`, 'true'); // Store the application status in localStorage
                toast.success('You have successfully applied for this job!');
            } else {
                toast.error('Failed to apply for the job.');
            }
        } catch (err) {
            toast.error('Error applying for the job.');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-500">{job.description}</p>
            <p><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
            <p><strong>Salary:</strong> {job.salary} LPA</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Experience Level:</strong> {job.experienceLevel} years</p>
            <p><strong>Position:</strong> {job.position}</p>

            {/* Apply Button */}
            <Button
                onClick={!isApplied ? applyJobHandler : null}
                disabled={isApplied}
                className={`absolute top-20 right-5 rounded-full text-white font-medium py-2 px-4 shadow-lg transition-transform duration-300 ease-in-out ${
                    isApplied
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#6A38C2] hover:bg-[#7b46d6] cursor-pointer"
                }`}
            >
                {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
        </div>
    );
};

export default JobDetails;
