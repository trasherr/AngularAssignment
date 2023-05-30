import { ITeacher } from "./ITeacher.interface";

export interface IStudent {
    id: number | undefined,
   
    name: string,
    rollNo: number,
    dob: Date,
    score: number,
    teacherId: number | undefined,
    Teacher: ITeacher | undefined
    
}