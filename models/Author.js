const { string } = require('joi')
const mongoose = require('mongoose')
const joi = require('joi');


const AuthorSchema = new mongoose.Schema({
      first_name:{
          type:String,
          required:true,
          trim:true,
          minlength:3,
          maxlength:50,
       },
       last_name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
     },
     nationality:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
     }
},{
    timestamps:true,
})


function validatePutAuth(obj) {
   const schema = joi.object({
      first_name:joi.string().min(3).max(50).trim(),
      last_name:joi.string().min(3).max(50).trim(),
      nationality:joi.string().min(3).max(50).trim(),
      age:joi.number().min(10).max(100),
   })
   return schema.validate(obj)
}

//  validate author information 
function validateAuthor(obj) {
   const schema = joi.object({
      first_name:joi.string().min(3).max(50).trim().required(),
      last_name:joi.string().min(3).max(50).trim().required(),
      nationality:joi.string().min(3).max(50).trim().required(),
      age:joi.number().min(10).max(100).required(),
   })

   return schema.validate(obj)
}


const Author = mongoose.model('Author',AuthorSchema)

module.exports = {Author,validateAuthor,validatePutAuth}
