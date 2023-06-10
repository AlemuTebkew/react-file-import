import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
const taskRouter=require('./routes/index')
const fs = require('fs')
const path = require('path')
// const readXlsxFile = require('read-excel-file/node')
const multer = require('multer')

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.static('./public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({}))
app.use('/',taskRouter)
 

// Start the server
app.listen('5000', () => {
    console.log(`Server started on port 5000`);
  });
  
  module.exports=app