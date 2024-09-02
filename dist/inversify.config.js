"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const studentServiceImpl_1 = require("./services/studentServiceImpl");
const types_1 = require("./types");
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.StudentService).to(studentServiceImpl_1.StudentService);
