const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  try {
    //filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        
      }
      console.log("Deleting ..", "Successfully Deleted");
    });
  } catch (error) {
    throw error
  }
}; 
module.exports = deleteFile;
