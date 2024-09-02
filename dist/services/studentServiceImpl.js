"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const inversify_1 = require("inversify");
const studentModel_1 = __importDefault(require("../models/studentModel"));
const path_1 = __importDefault(require("path"));
let StudentService = class StudentService {
    addStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, rollno, dob, gender, email, phone, course } = req.body;
                console.log(req.body);
                const newStudent = new studentModel_1.default({
                    name,
                    rollno,
                    dob,
                    gender,
                    email,
                    phone,
                    course,
                });
                yield newStudent.save();
                res.status(201).json({ success: true });
            }
            catch (error) {
                console.error("Error adding student:", error);
                // Narrow down the type of error
                if (error instanceof Error) {
                    res.status(500).json({
                        success: false,
                        message: error.message || "Something went wrong in adding Student",
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: "Something went wrong in adding Student",
                    });
                }
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.query;
                const updateFields = {};
                if (req.body.name)
                    updateFields.name = req.body.name;
                if (req.body.dob)
                    updateFields.dob = new Date(req.body.dob);
                if (req.body.rollno)
                    updateFields.rollno = req.body.rollno;
                if (req.body.gender)
                    updateFields.gender = req.body.gender;
                if (req.body.email)
                    updateFields.email = req.body.email;
                if (req.body.phone)
                    updateFields.phone = req.body.phone;
                if (req.body.course)
                    updateFields.course = req.body.course;
                if (req.files && Array.isArray(req.files)) {
                    const imagePaths = req.files.map((file) => path_1.default.basename(file.path));
                    updateFields.images = imagePaths;
                }
                const student = yield studentModel_1.default.findByIdAndUpdate(_id, { $set: updateFields }, { new: true });
                if (!student) {
                    res.status(404).json({ success: false, message: "Student not found" });
                    return;
                }
                res.status(200).json({ success: true });
            }
            catch (error) {
                console.error("Error updating student:", error);
                res.status(500).json({ success: false, message: "Something went wrong" });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield studentModel_1.default.findByIdAndUpdate(req.query._id, {
                    $set: { isDeleted: true },
                });
                res
                    .status(200)
                    .json({ success: true, message: "Student deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting student:", error);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong in deleting student",
                });
            }
        });
    }
    studentList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentData = yield studentModel_1.default.find({ isDeleted: false }).exec();
                res.render("studentList", { studentData });
            }
            catch (error) {
                console.error("Error fetching student list:", error);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong in fetching student list",
                });
            }
        });
    }
    renderAddStudent(req, res) {
        res.render("addStudent");
    }
    renderEditStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query._id;
                const studentData = yield studentModel_1.default.findById(id).exec();
                if (studentData) {
                    res.render("editStudent", { student: studentData });
                }
                else {
                    res.status(404).json({ success: false, message: "Student not found" });
                }
            }
            catch (error) {
                console.error("Error fetching student data:", error);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong in fetching student data",
                });
            }
        });
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, inversify_1.injectable)()
], StudentService);
