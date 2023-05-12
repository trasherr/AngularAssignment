import express  from "express";

import { Index, register, studentLogin, teacherLogin } from "../controllers/homeController.js";


const HomeRoute = express.Router();
HomeRoute.post('/', Index );
HomeRoute.post('/account/register', register );
HomeRoute.post('/account/teacher', teacherLogin );
HomeRoute.post('/account/student', studentLogin );

export default HomeRoute;
