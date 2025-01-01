import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    if (!courseTitle?.trim() || !category?.trim()) {
      return res.status(400).json({
        message: "Course title and category are required.",
        success: false,
      });
    }

    const existingCourse = await Course.findOne({ courseTitle });
    if (existingCourse) {
      return res.status(409).json({
        message: "Course title already exists. Please choose a different title.",
        success: false,
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      message: "Failed to create course.",
      success: false,
    });
  }
};


export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = "", sortByPrice = "" } = req.query;

    // Parse categories string into an array if it is a string
    const categoryArray = Array.isArray(categories) ? categories : categories.split(",");

    // Create search query
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    // Apply category filter if specified
    if (categoryArray.length > 0 && categories !== "") {
      searchCriteria.category = { $in: categoryArray };
    }

    // Define sorting options
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; // Ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; // Descending
    }

    // Fetch courses based on criteria and sorting
    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      courses: courses || [],
      message: "Courses fetched successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({
      message: "An error occurred while fetching courses.",
      success: false,
      error: error.message,
    });
  }
};



export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate({ path: "creator", select: "name photoUrl" }) // Include creator name and photoUrl
      .select("courseTitle courseThumbnail courseLevel coursePrice creator");

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No published courses found.",
      });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching published courses:", error);
    return res.status(500).json({
      message: "Failed to fetch published courses.",
    });
  }
};


export const getCreatorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.id });

    if (!courses.length) {
      return res.status(404).json({
        courses: [],
        message: "No courses found for the creator.",
        success: false,
      });
    }

    return res.status(200).json({
      courses,
      message: "Courses fetched successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching creator courses:", error);
    return res.status(500).json({
      message: "Failed to fetch courses.",
      success: false,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
        success: false,
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const uploadResult = await uploadMedia(thumbnail.path);
      courseThumbnail = uploadResult.secure_url;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      ...(courseThumbnail && { courseThumbnail }),
    };

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course: updatedCourse,
      message: "Course updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({
      message: "Failed to update course.",
      success: false,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
        success: false,
      });
    }

    return res.status(200).json({
      course,
      message: "Course fetched successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({
      message: "Failed to fetch course by ID.",
      success: false,
    });
  }
};

export const createLecture = async (req,res) => {
  try {
      const {lectureTitle} = req.body;
      const {courseId} = req.params;

      if(!lectureTitle || !courseId){
          return res.status(400).json({
              message:"Lecture title is required"
          })
      };

      // create lecture
      const lecture = await Lecture.create({lectureTitle});

      const course = await Course.findById(courseId);
      if(course){
          course.lectures.push(lecture._id);
          await course.save();
      }

      return res.status(201).json({
          lecture,
          message:"Lecture created successfully."
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to create lecture"
      })
  }
}

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const lectures = course.lectures.map((lecture) => ({
      ...lecture.toObject(),
      lectureVideoUrl: lecture.videoUrl, // Add the video URL here
    }));

    return res.status(200).json({
      lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};



export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Update lecture fields
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture ID
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to edit lecture" });
  }
};


export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Delete lecture from Cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Remove lecture reference from associated courses
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      lecture,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove lecture" });
  }
};
  


export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    return res.status(200).json({
      lecture,
      message: "Lecture fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get lecture by ID" });
  }
};



// publish and unpublish logic

export const togglePublishCourse = async (req, res) => {
  try {
    
  const {courseId} = req.params;
  const {publish} = req.query; // true, false
  const course = await Course.findById(courseId);

  if(!course){
    return res.status(404).json({
      message:"Course not found"
    });
  }

  // publish status on the quey parameter
  course.isPublished = publish === "true";
  await course.save();
    
  const statusMessage = course.isPublished ? "published" : " Unpublished";

  return res.status(200).json({
    course,
    message:`Course is ${statusMessage}  `
  });



  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
    message: "Failed to Update status" });
  }

}
