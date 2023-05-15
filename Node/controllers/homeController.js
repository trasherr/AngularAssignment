import Teacher from "../models/teacher.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.js";

export const Index = (req,res) => {
    res.send({context: "Home"});
}

export const register = async (req,res) => {
    try{
        let password = await bcrypt.hash(req.body.password,10)
        await Teacher.create({ 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email,
            password: password
        });
        
        res.send();
        
    }
    catch(err){
        console.log(err);
        res.status(409).send();
    }
}


export const teacherLogin = async (req,res) => {
    
    const data = await Teacher.findOne({ where: { email: req.body.email }, raw: true  });
  
    if(bcrypt.compare(req.body.password, data.password)){
        const token = jwt.sign(
            {
                id:data.id,
                email: data.email
            },
            "access_token",
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
    
    const data = await Student.findOne({ where: { rollNo: req.body.rollNo }, raw: true  });

    if(new Date(data.dob) == new Date(req.body.dob)){
        const token = jwt.sign(
            {
                id:data.id,
                rollNo: data.rollNo
            },
            "access_token",
            {
                expiresIn: "2h"
            }
        )
        res.send({access_token: token});
        return;
    }
    res.status(419).send();
}