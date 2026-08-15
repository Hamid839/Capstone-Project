const mongoose = require("mongoose");

// Student Schema — defines the shape and validation rules for a
// student document stored in MongoDB.
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      unique: true, // No two students can share an email
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    course: {
      type: String,
      required: [true, "Course is required."],
      trim: true,
    },
    marks: {
      type: Number,
      required: [true, "Marks are required."],
      min: [0, "Marks cannot be less than 0."],
      max: [100, "Marks cannot be more than 100."],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Student", studentSchema);
