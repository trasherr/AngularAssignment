import conn from "../database/connection.js";
import Sequelize from "sequelize";


//teacher model 
const Student = conn.define('Students', {

   id:{
     // Integer Datatype
     type:Sequelize.INTEGER.UNSIGNED,
     autoIncrement:true,
     allowNull:false,
     primaryKey:true
  },

  name: { type: Sequelize.STRING, allowNull:false },
  rollNo: { type: Sequelize.STRING, allowNull:false, unique: true },
  dob: { type: Sequelize.DATEONLY, allowNull:false },
  score: { type: Sequelize.INTEGER, allowNull:false },
  teacherId: { type: Sequelize.INTEGER, allowNull:false },
 }
);


export default Student;