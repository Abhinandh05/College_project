import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Course title is required"],  // Ensures courseTitle is never null
      unique: true,  // Enforces uniqueness
      validate: {
        validator: function(value) {
          return value && value.trim().length > 0;  // Ensures it's not empty or just whitespace
        },
        message: "Course title cannot be empty or just whitespace.",
      },
    },
    subTitle: { type: String },
    description: { type: String },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    courseLevel: {
      type: String,
      enum: ['Beginner', 'Medium', 'Advanced'], // Ensure the exact values match your form
    },
    
    coursePrice: { type: Number },
    courseThumbnail: { type: String },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure unique index is applied only after we ensure non-null title
courseSchema.index({ courseTitle: 1 }, { unique: true });

export const Course = mongoose.model("Course", courseSchema);
