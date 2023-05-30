import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import bcrypt from "bcrypt";

export const changePassword = async (req,res) => {

    let data = await Teacher.scope('withPassword').findByPk(req.body.identity,{ raw: true });
    console.log(data);
    const compare = await bcrypt.compare(req.body.password, data.password);
    let password = await bcrypt.hash(req.body.newPassword,10);
    if(compare){
        await Teacher.update({ password: password }, { where: { id: req.body.identity } });
        res.send();
        return;
    }
    res.status(419).send();
}

export const get = async (req,res) => {

    const data = await Teacher.findByPk(req.body.identity);
    res.send(data);
}

export const getAllStudents = async (req,res) => {
    req.query.size = req.query.size ? Number(req.query.size) : 10;
    const offset = req.query.page * req.query.size 
    const data = await Student.findAll({ include:Teacher, limit: req.query.size, offset: offset });
    const count = await Student.count();
    res.send({ students: data, count: count });
}

export const CreateStudentRecord = async (req,res) => {

    const unique = await Student.findOne({ where: { rollNo: req.body.rollNo }, raw: true });

    if(!unique){
        Student.create({
            name: req.body.name,
            rollNo: req.body.rollNo,
            score: req.body.score,
            teacherId: req.body.identity,
            dob: new Date(req.body.dob)
        })
        .then((student) => res.send())
        .catch(err => res.status(500).send());
    }
    else res.status(409).send();
}


export const updateStudentRecord = (req,res) => {

    Student.update({
        name: req.body.name,
        score: req.body.score,
        dob: new Date(req.body.dob)
    },{
        where: { id: req.params.studentId }
    }).then((student) => {
        res.send()
    }).catch(err => {
        console.log(err);
        res.status(500).send()
    })
}

export const destroyStudentRecord = async (req,res) => {

    await Student.destroy({ where: { id: req.params.studentId } });
    res.send();
}


export const addTeacher = async (req,res) => {
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
