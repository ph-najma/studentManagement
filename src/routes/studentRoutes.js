"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const db_1 = __importDefault(require("../db"));
// Initialize express router
const router = express_1.default.Router();
// Connect to the database
(0, db_1.default)();
// Define routes
router.get("/addStudent", (req, res) => {
    (0, studentController_1.renderAddStudent)(req, res);
});
router.post("/addStudent", studentController_1.upload.array("images", 5), (req, res) => {
    (0, studentController_1.addStudent)(req, res);
});
exports.default = router;
