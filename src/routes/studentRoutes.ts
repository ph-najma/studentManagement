import express, { Request, Response, Router } from "express";
import { container } from "../inversify.config";
import { StudentController } from "../controllers/studentController";

const router: Router = express.Router();
const studentController =
  container.resolve<StudentController>(StudentController); // Type assertion here

router.get("/addStudent", (req: Request, res: Response) => {
  studentController.renderAddStudent(req, res);
});

router.post("/addStudent", (req: Request, res: Response) => {
  studentController.addStudent(req, res);
});

router.get("/studentList", (req: Request, res: Response) => {
  studentController.studentList(req, res);
});

router.get("/editStudent", (req: Request, res: Response) => {
  studentController.renderEditStudent(req, res);
});

router.post("/updateStudent", (req: Request, res: Response) => {
  studentController.updateStudent(req, res);
});

router.post("/deleteStudent", (req: Request, res: Response) => {
  studentController.deleteStudent(req, res);
});

export default router;
