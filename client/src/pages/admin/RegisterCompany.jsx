import React, { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();

    const registerNewCompany = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/company/register",
                { companyName },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success(response.data.message || "Registration completed successfully!");
                setCompanyName(""); // Clear input
                navigate("/admin/CompanyDetails"); // Navigate after successful registration
            } else {
                toast.error(response.data.message || "Failed to register the company.");
            }
        } catch (error) {
            toast.error("An error occurred while registering the company.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="my-10">
                <h1 className="font-bold text-2xl">Your Company Name</h1>
                <p className="text-gray-500">
                    What would you like to give your company name? You can change this later.
                </p>
            </div>

            <Label>Company Name</Label>
            <Input
                type="text"
                className="my-2"
                placeholder="JobHunt, Microsoft, etc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />

            <div className="flex items-center gap-2 my-10">
                <Button variant="outline" onClick={() => navigate("/admin/CompanyDetails")}>
                    Cancel
                </Button>
                <Button onClick={registerNewCompany}>Continue</Button>
            </div>
        </div>
    );
};

export default RegisterCompany;
