import express  from "express";

import { Index, studentLogin, teacherLogin } from "../controllers/homeController.js";


const HomeRoute = express.Router();
HomeRoute.post('/', Index );
HomeRoute.post('/account/teacher', teacherLogin );
HomeRoute.post('/account/student', studentLogin );

export default HomeRoute;
