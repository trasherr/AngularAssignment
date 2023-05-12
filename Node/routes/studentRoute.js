import express  from "express";

import { getStudent } from "../controllers/StudentController.js";

const StudentRoute = express.Router();
StudentRoute.get('/getStudent', getStudent );

export default StudentRoute;