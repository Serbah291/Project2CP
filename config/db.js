const mongoose = require('mongoose');

 async function connectToDb() {

    try {
     await   mongoose.connect(process.env.MONGODB_URI)
        console.log("connection to mongoDB...")
    } catch (error) {
         console.log("failed to connect to mongoDB",error)

    }
  
 
 }


 module.exports = connectToDb

