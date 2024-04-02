
const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const {User,validateUpdateUser} = require('../models/User')
const {verifyToken,verifyTokenAndAuthorisation, verifyTokenAndAdmin} = require('../middlewares/verifyToken')

/**
 * @desc Update User
 * @route /api/user/:id 
 * @method put 
 * @access private
 */

router.put('/:id',verifyTokenAndAuthorisation, asyncHandler(async(req,res)=>{

   

     const {error} = validateUpdateUser(req.body)

     if (error) {
        return res.status(400).json({message: error.details[0].message})
     }


     if (req.body.password ) {
         const salt = await bcrypt.genSalt(10)
         req.body.password = await bcrypt.hash(req.body.password, salt)
     }

     const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isAdmi: req.body.isAdmi,
        }
     },{new: true}).select("-password")

     res.status(200).json(updatedUser)



}))




/**
 * @desc Get All Users
 * @route /api/users
 * @method get 
 * @access private (only admin)
 */

router.get('/',verifyTokenAndAdmin, asyncHandler(async(req,res)=>{

   const AllUsers = await User.find().select("-password")
   res.status(200).json(AllUsers)

}))

/**
 * @desc Get user by id
 * @route /api/users/:id
 * @method get 
 * @access private (only admin && user himself)
 */

router.get('/:id',verifyTokenAndAuthorisation, asyncHandler(async(req,res)=>{
   const user = await User.findById(req.params.id).select("-password")
   res.status(200).json(user)

}))


/**
 * @desc Delete user by id
 * @route /api/users/:id
 * @method Delete 
 * @access private (only admin && user himself)
 */

router.delete('/:id',verifyTokenAndAuthorisation, asyncHandler(async(req,res)=>{
   const user = await User.findById(req.params.id).select("-password")
   if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message:" User deleted successfully "})
   } else {
      res.status(403).json({message:" user not found !!"})
   }
   

}))



module.exports = router



























































































