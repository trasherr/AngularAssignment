export interface IStudent {
    id: number | undefined,
   
    name: string,
    rollNo: number,
    dob: Date,
    score: number,
    teacherId: number | undefined,
    teacher: any | undefined
    
}