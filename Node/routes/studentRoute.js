import express  from "express";

import { getStudent } from "../controllers/studentController.js";

const StudentRoute = express.Router();
StudentRoute.get('/getStudent', getStudent );

export default StudentRoute;
