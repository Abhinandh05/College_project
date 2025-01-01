import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/course.model.js";

// Get Course Progress
export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id; // Assuming `req.id` contains user ID.

        const courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");
        const courseDetails = await Course.findById(courseId).populate("lectures");

        if (!courseDetails) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (!courseProgress) {
            return res.status(200).json({
                data: { courseDetails, progress: [], completed: false },
            });
        }

        return res.status(200).json({
            data: {
                courseDetails,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed,
            },
        });
    } catch (error) {
        console.error("Error fetching course progress:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Lecture Progress
export const updateLectureProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.id;

        let courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: [],
            });
        }

        const lectureIndex = courseProgress.lectureProgress.findIndex(
            (lecture) => lecture.lectureId === lectureId
        );

        if (lectureIndex !== -1) {
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            courseProgress.lectureProgress.push({ lectureId, viewed: true });
        }

        const course = await Course.findById(courseId);
        if (course.lectures.length === courseProgress.lectureProgress.filter((lecture) => lecture.viewed).length) {
            courseProgress.completed = true;
        }

        await courseProgress.save();
        return res.status(200).json({ message: "Lecture progress updated successfully" });
    } catch (error) {
        console.error("Error updating lecture progress:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mark Course as Completed
export const markAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            return res.status(404).json({ message: "Course progress not found" });
        }

        courseProgress.lectureProgress.forEach((lecture) => (lecture.viewed = true));
        courseProgress.completed = true;
        await courseProgress.save();

        return res.status(200).json({ message: "Course marked as completed" });
    } catch (error) {
        console.error("Error marking course as completed:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mark Course as Incompleted
export const markAsInCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            return res.status(404).json({ message: "Course progress not found" });
        }

        courseProgress.lectureProgress.forEach((lecture) => (lecture.viewed = false));
        courseProgress.completed = false;
        await courseProgress.save();

        return res.status(200).json({ message: "Course marked as uncompleted" });
    } catch (error) {
        console.error("Error marking course as uncompleted:", error);
        res.status(500).json({ message: "Server error" });
    }
};