import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Job = () => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createAt;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    };

    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/job/get', { withCredentials: true });
                if (response.data.success) {
                    setJobs(response.data.jobs);
                }
            } catch (err) {
                setError('Failed to fetch jobs.');
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="p-5 rounded-md bg-white border border-gray-100 flex gap-4">
            {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                    <div
                        key={job.id}
                        className="my-4 p-5 rounded-lg shadow-md bg-white w-[300px] transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                            </p>
                            <Button variant="outline" className="rounded-full" size="icon">
                                <Bookmark />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 my-2">
                            <Button className="p-6" variant="outline" size="icon">
                                <Avatar>
                                    <AvatarImage src={job?.company?.logo} />
                                </Avatar>
                            </Button>
                            <div>
                                <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                                <p className="text-sm text-gray-500">India</p>
                            </div>
                        </div>

                        <div>
                            <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                            <p className="text-small text-gray-600">{job?.description}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="text-blue-700 font-bold" variant="ghost">
                                {job?.position} Positions
                            </Badge>
                            <Badge className="text-[#F83002] font-bold" variant="ghost">
                                {job?.jobType}
                            </Badge>
                            <Badge className="text-[#7209b7] font-bold" variant="ghost">
                                {job?.salary} LPA
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                        <Button variant="outline">
  <Link to={`/description/${job._id}`} className="no-underline">
    Details
  </Link>
</Button>



                            <Button className="bg-[#7209b7] hover:bg-[#5a1d97] transition-colors">Save For Later</Button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No jobs posted yet.</p>
            )}
        </div>
    );
};

export default Job;
