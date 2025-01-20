import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const GetCompany = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Replace with your backend API endpoint
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/company/get', { withCredentials: true });
                setCompanies(response.data.companies);
            } catch (err) {
                setError('Error fetching companies');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Registered Companies</h1>
                <Button variant="solid" color="green" className="self-center" onClick={() => navigate('register')}>
                    Create Company
                </Button>
            </div>

            {companies.length === 0 ? (
                <p>No companies registered yet.</p>
            ) : (
                <ul>
                    {companies.map((company) => (
                        <li key={company._id} className="relative mb-4 p-4 border rounded-lg shadow-lg flex items-center">
                            {/* Display company logo */}
                            {company.logo && (
                                <img
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    className="w-16 h-16 mr-4 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <h2 className="text-xl font-semibold">{company.name}</h2>
                                <p>{company.description || 'No description available'}</p>
                                <p>Location: {company.location || 'Not provided'}</p>
                                <a href={company.website || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                    Visit Website
                                </a>
                            </div>
                            <Button
                                variant="solid"
                                color="blue"
                                className="absolute top-2 right-2"
                                onClick={() => navigate(`${company._id}`)}

                            >
                                Edit
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetCompany;
