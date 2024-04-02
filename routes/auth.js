const express = require('express')
const joi = require('joi')
const router = express.Router()
const {User,validateLoginUser,validateUpdateUser,validateRegisterUser} = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


/**
 * @desc registers a  new user
 * @route /api/auth/register 
 * @method Post 
 * @access public
 */


router.post('/register',asyncHandler(async(req,res)=>{

       const {error} = validateRegisterUser(req.body)
       if (error) {
          return res.status(400).json({message:error.details[0].message})
       }

      const user = await User.findOne({email: req.body.email})

      if (user) {
        return res.status(400).json({message: 'Registration already'})
      }
    //------------- Cryptage de password  //-------------------------
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password,salt)
      //-------------------------------------------------------------------
      const newUser =  new User({
           email: req.body.email,
           username: req.body.username,
           password: req.body.password,
      })

     const result= await newUser.save()
 //------------------  Token --------------------
     const token = jwt.sign({id:newUser._id,isAdmi:newUser.isAdmi} , process.env.SECRET_KEY)
     const {password,...other} = result._doc;

     res.status(201).json({...other,token})

}))




/**
 * @desc  login a user
 * @route /api/auth/login 
 * @method Post 
 * @access public
 */


router.post('/login',asyncHandler(async(req,res)=>{

    const {error} = validateLoginUser(req.body)

    if (error) {
       return res.status(400).json({message:error.details[0].message})
    }
    

    const user = await User.findOne({email: req.body.email})

    if (!user) {
      return res.status(400).json({message: 'email does not exist'})
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isPasswordMatch) {
        return res.status(400).json({message: 'password invalid'}) 
    }

     //------------------  Token --------------------
   const token = jwt.sign({id:user._id,isAdmi:user.isAdmi} , process.env.SECRET_KEY)
   const {password,...other} = user._doc;

   res.status(201).json({...other,token})

}))





module.exports = router