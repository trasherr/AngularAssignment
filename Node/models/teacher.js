import conn from "../database/connection.js";
import Sequelize from "sequelize";
import Student from "./student.js";

//teacher model 
const Teacher = conn.define('Teachers', {

  id:{
     // Integer Datatype
     type:Sequelize.INTEGER,
     autoIncrement:true,
     allowNull:false,
     primaryKey:true
  },

  firstName: { type: Sequelize.STRING, allowNull:false },
  lastName: { type: Sequelize.STRING, allowNull:false },
  email: { type: Sequelize.STRING, allowNull:false, unique:true },
  password: { type: Sequelize.STRING, allowNull:false },
 },
 {
    defaultScope: {
       attributes: { exclude: ['password'] },
    },
    scopes: {
       withPassword: {
          attributes: { },
       }
    }
 }
);

Teacher.hasMany(Student);
Student.belongsTo(Teacher,{
  onDelete:"CASCADE",
  onUpdate:"CASCADE"
});

export default Teacher;