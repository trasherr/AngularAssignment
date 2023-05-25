import Student from "../models/student.js";

export const getStudent = async (req,res) => {
    const data = await Student.findOne({ where:{ id: req.body.identity } });
    res.send(data);
}
