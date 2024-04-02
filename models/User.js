const mongoose = require('mongoose')
const joi = require('joi')


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim :true,
        minlength:5,
        maxlength:100,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        trim :true,
        minlength:5,
        maxlength:100,
    },
    password:{
        type:String,
        required:true,
        trim :true,
        minlength:5,
    },
    isAdmi:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})


//**************************************************************************** */
function validateRegisterUser(obj) {
    const schema = joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        username:joi.string().trim().min(5).max(100).required(),
        password:joi.string().trim().min(5).required(),
        isAdmi:joi.bool(),
    })
    return schema.validate(obj)
}


//**************************************************************************** */
function validateLoginUser(obj) {
    const schema = joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        password:joi.string().trim().min(5).required(),
    })
    return schema.validate(obj)
}

//**************************************************************************** */
function validateUpdateUser(obj) {
    const schema = joi.object({
        email:joi.string().trim().min(5).max(100).email(),
        username:joi.string().trim().min(5).max(100),
        password:joi.string().trim().min(5),
    })
    return schema.validate(obj)
}

const User = mongoose.model('User',UserSchema)

module.exports = {User,validateLoginUser,validateUpdateUser,validateRegisterUser}