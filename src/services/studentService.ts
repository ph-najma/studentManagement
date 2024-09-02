import { Request, Response } from "express";

export interface IStudentService {
  addStudent(req: Request, res: Response): Promise<void>;
  updateStudent(req: Request, res: Response): Promise<void>;
  deleteStudent(req: Request, res: Response): Promise<void>;
  studentList(req: Request, res: Response): Promise<void>;
  renderAddStudent(req: Request, res: Response): void;
  renderEditStudent(req: Request, res: Response): Promise<void>;
}
