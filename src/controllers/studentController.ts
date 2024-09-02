// src/controllers/studentController.ts
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IStudentService } from "../services/studentService";
import { TYPES } from "../types";

@injectable()
export class StudentController {
  private studentService: IStudentService;

  constructor(@inject(TYPES.StudentService) studentService: IStudentService) {
    this.studentService = studentService;
  }

  renderAddStudent = (req: Request, res: Response): void => {
    this.studentService.renderAddStudent(req, res);
  };

  addStudent = async (req: Request, res: Response): Promise<void> => {
    await this.studentService.addStudent(req, res);
  };

  updateStudent = async (req: Request, res: Response): Promise<void> => {
    await this.studentService.updateStudent(req, res);
  };

  deleteStudent = async (req: Request, res: Response): Promise<void> => {
    await this.studentService.deleteStudent(req, res);
  };

  studentList = async (req: Request, res: Response): Promise<void> => {
    await this.studentService.studentList(req, res);
  };

  renderEditStudent = async (req: Request, res: Response): Promise<void> => {
    await this.studentService.renderEditStudent(req, res);
  };
}
