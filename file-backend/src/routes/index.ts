const express=require('express')
import { Router } from "express";
// Create a route to import a file
const {getTasks,uploadTasks,deleteTask,updateTask}= require("../controllers/task-controller")
const upload=require('../middleware/file-uploader')

const app=express();
const router:Router=Router()
    // Get the file contents from the request body
   router.post('/imports',upload,uploadTasks);
   router.get('/get_tasks',getTasks);
   router.delete('/delete_task/:id',deleteTask);
   router.put('/update_task/:id',updateTask);
    
module.exports= router

  