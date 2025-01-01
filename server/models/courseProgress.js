import mongoose from "mongoose";

// Define the Lecture Progress Schema
const lectureProgressSchema = new mongoose.Schema({
    lectureId: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        default: false,
    },
});

// Define the Course Progress Schema
const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    lectureProgress: [lectureProgressSchema],
});

// Create the CourseProgress model
export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
