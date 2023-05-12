import express  from "express";
import { addStudentRecord, destroyStudentRecord, getAllStudents, updateProfile, updateStudentRecord } from "../controllers/teacherController.js";

const TeacherRoute = express.Router();

TeacherRoute.get('/getAllStudents', getAllStudents );
TeacherRoute.put('/updateProfile', updateProfile );
TeacherRoute.post('/addStudentRecord', addStudentRecord );
TeacherRoute.delete('/destroyStudentRecord', destroyStudentRecord );
TeacherRoute.put('/updateStudentRecord', updateStudentRecord );

export default TeacherRoute;
