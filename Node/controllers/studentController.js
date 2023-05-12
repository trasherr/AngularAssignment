import Student from "../models/student.js";

export const getStudent = async (req,res) => {
    const data = await Student.findOne({ where:{ rollNo: req.body.identity } });
    res.send(data);
}
