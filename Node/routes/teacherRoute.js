import express  from "express";
import { CreateStudentRecord, destroyStudentRecord, getAllStudents, updateProfile, updateStudentRecord } from "../controllers/teacherController.js";

const TeacherRoute = express.Router();

TeacherRoute.get('/getAllStudents', getAllStudents );
TeacherRoute.put('/updateProfile', updateProfile );
TeacherRoute.post('/CreateStudentRecord', CreateStudentRecord );
TeacherRoute.delete('/destroyStudentRecord/:studentId', destroyStudentRecord );
TeacherRoute.put('/updateStudentRecord/:studentId', updateStudentRecord );

export default TeacherRoute;
