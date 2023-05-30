import Teacher from "../models/teacher.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.js";

export const Index = (req,res) => {
    res.send({context: "Home"});
}

export const teacherLogin = async (req,res) => {
    
    const data = await Teacher.scope('withPassword').findOne({ where: { email: req.body.email }, raw: true });
    if(!data) {
        res.status(419).send();
        return ;
    }
    const compare = await bcrypt.compare(req.body.password, data.password);
    console.log(process.env.ACCESS_TOKEN);
    if(compare){
        const token = jwt.sign(
            {
                id:data.id,
                email: data.email
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "24h"
            }
        )
        res.send({access_token: token});
        return;
    }
    res.status(419).send();
}



export const studentLogin = async (req,res) => {
    
    const data = await Student.findOne({ where: { rollNo: req.body.rollNo, dob: new Date(req.body.dob) }, raw: true  });
    
    if(data){
        const token = jwt.sign(
            {
                id:data.id,
                rollNo: data.rollNo
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "2h"
            }
        )
        res.send({access_token: token});
        return;
    }
    res.status(419).send();
}