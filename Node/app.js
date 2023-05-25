// npm pacakages =================================
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import  dotenv from 'dotenv';
// npm pacakages =================================
dotenv.config();

// Routes =======================================
import HomeRoute from './routes/homeRoute.js';
import TeacherRoute from './routes/teacherRoute.js';
import StudentRoute from './routes/studentRoute.js';
// Routes =======================================

// MiddleWare =======================================
import teacherAuth from './controllers/middleware/teacherAuth.js';
import studentAuth from './controllers/middleware/studentAuth.js';
// MiddleWare =======================================

const PORT = process.env.PORT || 5555;
let app = express();

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public')); 

app.use('/api',HomeRoute);
app.use('/api/teacher',teacherAuth ,TeacherRoute);
app.use('/api/student', studentAuth,StudentRoute);


app.listen(PORT,() => {
    console.log("Running at port:: "+PORT);
});