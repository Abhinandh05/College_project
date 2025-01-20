import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required.", success: false });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: "You can't register the same company.", success: false });
        }
        company = await Company.create({ name: companyName, userId: req.id });
        return res.status(201).json({ message: "Company registered successfully.", company, success: true });
    } catch (error) {
        return res.status(500).json({ message: "An internal error occurred.", error: error.message, success: false });
    }
};
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Log the body
        // console.log('File:', req.file); // Log the file

        const { name, description, website, location } = req.body;
        const file = req.file;

        // Additional checks or processing...

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true
        });
    } catch (error) {
        console.error("Error in updateCompany:", error);  // Log the error
        return res.status(500).json({
            message: "An internal error occurred.",
            success: false,
            error: error.message
        });
    }
};


// Update job details
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const jobId = req.params.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Some fields are missing.",
                success: false
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        job.title = title;
        job.description = description;
        job.requirements = requirements.split(",");
        job.salary = Number(salary);
        job.location = location;
        job.jobType = jobType;
        job.experienceLevel = experience;
        job.position = position;
        job.company = companyId;

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "An error occurred while updating the job.",
            success: false
        });
    }
};
