import { Response, Request } from "express";
const deleteFile= require('../util/remove-file')
const Task = require("../models/Task");
const readXlsxFile = require("read-excel-file/node");

import multer from "multer";

const upload = multer({ dest: "../../dist/uploads" });
const uploadTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    if(!req.file){
      res.status(400).json('FIle Not Found');
    }
     console.log("req", req.file);
     await importFileToDb(req.file.path);
    const tasks = await Task.findAll({});
    deleteFile(req.file.path)

    res.status(200).json(await Task.findAll({}));
  } catch (error) { 
    throw error;
  }
}; 
const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll({});
    console.log("tasks", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    throw error;
  }
};

async function importFileToDb(exFile) {
  await Task.destroy({ truncate: true });

  const rows=await readXlsxFile(exFile)
    rows.shift();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if(row.length === 0)
      continue


     await Task.create({
        itemNo: row[0],
        description: row[1],
        unit: row[2],
        qty: row[3],
        rate: row[4],
        amount: row[5], 
      });
    }
    deleteFile(exFile)
  
    console.log("rows", rows);
  
}

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({where:{id:req.params.id}});
    await task.destroy()
    res.status(200).json('deleted');
  } catch (error) {
    throw error;
  }
};
const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {

    // return req.body;
    const task = await Task.findOne({where:{id:req.params.id}});
     await Task.update(req.body,{where:{id:req.params.id}})
    res.status(200).json(req.body);
  } catch (error) {
    throw error;
  }
};
module.exports = { getTasks, uploadTasks,deleteTask,updateTask };
