const mongoose = require('mongoose')
const joi = require('joi')

const bookSchema = new mongoose.Schema({
      title:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:50,
      },
      author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author",
        trim:true,
      },
},{timestamps:true})


// check Uptated book validation
function validationPutBook(obj)
{
   const schema = joi.object({
       title:joi.string().trim().min(2).max(50),
       author:joi.string(),
   })

   return schema.validate(obj)
}


// check book validation
function validationBook(obj)
{
   const schema = joi.object({
       title:joi.string().trim().min(2).max(50).required(),
       author:joi.string(),
   })

   return schema.validate(obj)

}





const Book = mongoose.model('Book',bookSchema)
module.exports = {Book,validationPutBook,validationBook}

