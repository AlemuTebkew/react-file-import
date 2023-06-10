const {Sequelize} =require('sequelize')
// Connect to the database
const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    database: "file-import",
    username: "root",
    password: ""
  }); 

  module.exports= sequelize
  