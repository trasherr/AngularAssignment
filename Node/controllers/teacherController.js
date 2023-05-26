import Student from "../models/student.js";
import Teacher from "../models/teacher.js";


export const updateProfile = (req,res) => {

    Teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    },{
        where: { teacherId: req.body.identity }
    }).then((result) => {
        res.send()
    }).catch(err => {
        console.log(err);
        res.status(500).send()
    })
}

export const getAllStudents = async (req,res) => {
    req.query.size = req.query.size ? Number(req.query.size) : 10;
    const offset = req.query.page * req.query.size 
    const data = await Student.findAll({ where:{ teacherId: req.body.identity }, limit: req.query.size, offset: offset });
    const count = await Student.count({ where:{ teacherId: req.body.identity } });
    res.send({ students: data, count: count });
}

export const CreateStudentRecord = async (req,res) => {

    const unique = await Student.findOne({ where: { teacherId: req.body.identity, rollNo: req.body.rollNo }, raw: true });

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
        where: { teacherId: req.body.identity, id: req.params.studentId }
    }).then((student) => {
        res.send()
    }).catch(err => {
        console.log(err);
        res.status(500).send()
    })
}

export const destroyStudentRecord = async (req,res) => {

    await Student.destroy({ where: { teacherId: req.body.identity, id: req.params.studentId } });
    res.send();
}