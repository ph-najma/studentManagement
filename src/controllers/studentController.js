"use strict";
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
exports.upload = exports.addStudent = exports.renderAddStudent = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
// Adjust the import according to your file structure
// Multer setup for file storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
// Multer middleware for file uploads
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
// Render the Add Student page
const renderAddStudent = (req, res) => {
    res.render("addStudent");
};
exports.renderAddStudent = renderAddStudent;
// Add a new student
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, rollno, dob, gender, email, phone, course } = req.body;
        // Assuming files are available in req.files; adjust if using a different upload method
        if (!req.files || req.files.length === 0) {
            res
                .status(400)
                .json({ success: false, message: "No files were uploaded." });
            return;
        }
        const images = req.files.map((file) => file.path);
        const newStudent = new studentModel_1.default({
            name,
            rollno,
            dob,
            gender,
            email,
            phone,
            course,
            images,
        });
        yield newStudent.save();
        res.status(201).json({ success: true });
    }
    catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in adding Student",
        });
    }
});
exports.addStudent = addStudent;
