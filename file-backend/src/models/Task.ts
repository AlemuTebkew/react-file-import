import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { Model } from "sequelize-typescript";

const sequelize = require("../config/db-config");
// Create a model
const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemNo: {
    type: DataTypes.DOUBLE,
  },
  description: {
    type: DataTypes.TEXT,
  },
  unit: {
    type: DataTypes.STRING,
  },
  qty: {
    type: DataTypes.DOUBLE,
  },
  rate: {
    type: DataTypes.DOUBLE,
  },
  amount: {
    type: DataTypes.DOUBLE,
  },
});

module.exports = Task;

sequelize
  .sync({ force: false })
  .then(() => {})
  .catch((err: any) => {
    console.log("sequelize err", err);
  });
