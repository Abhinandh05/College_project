import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const PostJobForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: '',
    });
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/company/get', { withCredentials: true });
                if (response.data.success) {
                    setCompanies(response.data.companies);
                }
            } catch (err) {
                setError('Failed to fetch companies.');
            }
        };

        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting

        try {
            const response = await axios.post('http://localhost:8080/api/v1/job/post', formData, {
                withCredentials: true,
            });
            if (response.data.success) {
                setSuccess(response.data.message);
                setError('');
                setFormData({
                    title: '',
                    description: '',
                    requirements: '',
                    salary: '',
                    location: '',
                    jobType: '',
                    experience: '',
                    position: '',
                    companyId: '',
                });
                toast.success('Job posted successfully!');
            } else {
                setError('Failed to post job, please try again.');
                toast.error('Failed to post job, please try again.');
            }
        } catch (err) {
            setError('Failed to post job, please try again.');
            setSuccess('');
            toast.error('Failed to post job, please try again.');
        } finally {
            setLoading(false); // Set loading to false after submission attempt
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto space-y-4">
            <Button
                variant="outline"
                className="mb-4 bg-gray-800 hover:bg-gray-500 text-white rounded-md px-4 py-2 shadow-lg transition-transform transform hover:scale-105"
                onClick={() => navigate("/admin/jobDetails")} // Define action here
            >
                Back
            </Button>
            <h2 className="text-2xl font-bold">Post a New Job</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                        id="salary"
                        name="salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Input
                        id="requirements"
                        name="requirements"
                        type="text"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type</Label>
                    <Input
                        id="jobType"
                        name="jobType"
                        type="text"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Input
                        id="experience"
                        name="experience"
                        type="text"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                        id="position"
                        name="position"
                        type="text"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyId">Company</Label>
                    <Select
                        id="companyId"
                        name="companyId"
                        value={formData.companyId}
                        onValueChange={(value) => setFormData({ ...formData, companyId: value })}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Company" />
                        </SelectTrigger>
                        <SelectContent>
                            {companies.map((company) => (
                                <SelectItem key={company._id} value={company._id}>
                                    {company.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="col-span-2" disabled={loading}>
                    {loading ? (
                        <span className="loader"></span> // Display loader here
                    ) : (
                        'Post Job'
                    )}
                </Button>
            </form>
        </div>
    );
};

export default PostJobForm;
