import { Container } from "inversify";
import { IStudentService } from "./services/studentService";
import { StudentService } from "./services/studentServiceImpl";
import { TYPES } from "./types";

const container = new Container();

container.bind<IStudentService>(TYPES.StudentService).to(StudentService);

export { container };
