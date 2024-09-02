import { injectable } from "inversify";
import { IStudentService } from "./studentService";
import { Request, Response } from "express";
import Student from "../models/studentModel";
import path from "path";

interface UpdateFields {
  name?: string;
  dob?: Date;
  rollno?: string;
  gender?: "MALE" | "FEMALE" | "OTHERS";
  email?: string;
  phone?: string;
  course?: string;
  images?: string[];
}

@injectable()
export class StudentService implements IStudentService {
  async addStudent(req: Request, res: Response): Promise<void> {
    try {
      const { name, rollno, dob, gender, email, phone, course } = req.body;
      console.log(req.body);
      const newStudent = new Student({
        name,
        rollno,
        dob,
        gender,
        email,
        phone,
        course,
      });

      await newStudent.save();
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error adding student:", error);

      // Narrow down the type of error
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          message: error.message || "Something went wrong in adding Student",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Something went wrong in adding Student",
        });
      }
    }
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.query;
      const updateFields: UpdateFields = {};

      if (req.body.name) updateFields.name = req.body.name;
      if (req.body.dob) updateFields.dob = new Date(req.body.dob);
      if (req.body.rollno) updateFields.rollno = req.body.rollno;
      if (req.body.gender) updateFields.gender = req.body.gender;
      if (req.body.email) updateFields.email = req.body.email;
      if (req.body.phone) updateFields.phone = req.body.phone;
      if (req.body.course) updateFields.course = req.body.course;

      if (req.files && Array.isArray(req.files)) {
        const imagePaths = (req.files as Express.Multer.File[]).map((file) =>
          path.basename(file.path)
        );
        updateFields.images = imagePaths;
      }

      const student = await Student.findByIdAndUpdate(
        _id as string,
        { $set: updateFields },
        { new: true }
      );

      if (!student) {
        res.status(404).json({ success: false, message: "Student not found" });
        return;
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      await Student.findByIdAndUpdate(req.query._id as string, {
        $set: { isDeleted: true },
      });
      res
        .status(200)
        .json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong in deleting student",
      });
    }
  }

  async studentList(req: Request, res: Response): Promise<void> {
    try {
      const studentData = await Student.find({ isDeleted: false }).exec();
      res.render("studentList", { studentData });
    } catch (error) {
      console.error("Error fetching student list:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong in fetching student list",
      });
    }
  }

  renderAddStudent(req: Request, res: Response): void {
    res.render("addStudent");
  }

  async renderEditStudent(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query._id as string;
      const studentData = await Student.findById(id).exec();
      if (studentData) {
        res.render("editStudent", { student: studentData });
      } else {
        res.status(404).json({ success: false, message: "Student not found" });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong in fetching student data",
      });
    }
  }
}
