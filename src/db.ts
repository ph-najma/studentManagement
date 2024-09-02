import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoURI = "mongodb://localhost:27017/students";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB (local)");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connectToDatabase;
