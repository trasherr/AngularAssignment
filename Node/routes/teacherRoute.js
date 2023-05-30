import express  from "express";
import { CreateStudentRecord, addTeacher, changePassword, destroyStudentRecord, get, getAllStudents, updateStudentRecord } from "../controllers/teacherController.js";

const TeacherRoute = express.Router();

TeacherRoute.get('/getAllStudents', getAllStudents );
TeacherRoute.get('/get', get );
TeacherRoute.put('/changePassword', changePassword );
TeacherRoute.post('/CreateStudentRecord', CreateStudentRecord );
TeacherRoute.post('/CreateTeacherAccount', addTeacher );
TeacherRoute.delete('/destroyStudentRecord/:studentId', destroyStudentRecord );
TeacherRoute.put('/updateStudentRecord/:studentId', updateStudentRecord );

export default TeacherRoute;
