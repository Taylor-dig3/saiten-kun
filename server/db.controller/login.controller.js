const knex = require("../../knex");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = { 
  getStudentLogin(user_id, password){
    return knex("students")
      .select({
        user_id:"students.id",
        name:"students.name",
        password:"students.password"
      })
      .where({
        "students.id" : user_id
      })
      .first()
      .then(res => {
        console.log(res);
        let response = {};
        const bool = bcrypt.compareSync(process.env.HASHKEY + password,res.password)
        if (bool){
          response.user_id = res.user_id;
          response.name = res.name;
          response.login_state = "studentLogin"
       } else {
        response.login_state = "snotYetLoggedIn"
       }
       return response;
      })
  },

  getTeacherLogin(user_id, password){
    return knex("teachers")
      .select({
        user_id: "teachers.id",
        name: "teachers.name",
        password: "teachers.password"
      })
      .where({
        "teachers.id": user_id
      })
      .first()
      .then(res => {
        let response = {};
        const bool = bcrypt.compareSync(process.env.HASHKEY + password, res.password)
        if (bool) {
          response.user_id = res.user_id;
          response.name = res.name;
          response.login_state = "teacherLogin"
        } else {
          response.login_state = "notYetLoggedIn"
        };
        return response;
      })
  }
}