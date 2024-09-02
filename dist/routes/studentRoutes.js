"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_config_1 = require("../inversify.config");
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
const studentController = inversify_config_1.container.resolve(studentController_1.StudentController); // Type assertion here
router.get("/addStudent", (req, res) => {
    studentController.renderAddStudent(req, res);
});
router.post("/addStudent", (req, res) => {
    studentController.addStudent(req, res);
});
router.get("/studentList", (req, res) => {
    studentController.studentList(req, res);
});
router.get("/editStudent", (req, res) => {
    studentController.renderEditStudent(req, res);
});
router.post("/updateStudent", (req, res) => {
    studentController.updateStudent(req, res);
});
router.post("/deleteStudent", (req, res) => {
    studentController.deleteStudent(req, res);
});
exports.default = router;
