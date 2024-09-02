import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Student document
export interface IStudent extends Document {
  name: string;
  dob: Date;
  rollno: string;
  gender: "MALE" | "FEMALE" | "OTHERS"; // Restrict to specific values
  email: string;
  phone: string;
  isDeleted: Boolean;
  course: string;
  images: string[];
}

// Create a schema for the Student model
const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    rollno: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE", "OTHERS"], // Restrict to these values
    },
    email: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Student model
const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
