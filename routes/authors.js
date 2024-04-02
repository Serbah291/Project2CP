const express = require('express');
const router = express.Router();
const {Author,validateAuthor,validatePutAuth} = require('../models/Author');
const asyncHandler = require('express-async-handler')
const  { verifyTokenAndAdmin } = require('../middlewares/verifyToken') ;
// data of authors        :
// -----------------------


//*****************************************************************************************************
/**
 * @desc get all authors
 * @method GET
 * @route /api/author
 * @access public
 */

router.get('/', asyncHandler(
    async(req,res)=>{

         const authorList = await Author.find()
         res.status(200).json(authorList);
       
     }
))


//*****************************************************************************************************
/**
 * @desc get authors by id
 * @method GET
 * @route /api/author/:id
 * @access public
 */

router.get('/:id',asyncHandler(
    async(req,res)=>{
   
        
            const author = await Author.findById(req.params.id)
    
            if (author) {
                res.status(200).json(author)
            }else{
                res.status(404).json("author doesn't exist !")
            }
       
    
    }
))
//***************************************************************************************************** */
/**
 * @desc Post author
 * @method post
 * @route /api/author
 * @access private (only admin)
 */

router.post('/',verifyTokenAndAdmin,asyncHandler(
    async(req,res)=>{

        const {error} = validateAuthor(req.body)
    
        if (error) {
          return  res.status(400).json({message:error.details[0].message})
        }
    
        
    
            const author = new Author({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                nationality:req.body.nationality,
                age:req.body.age,
            })
    
          const result =await  author.save()
             res.status(201).json(result)
       
       
    }
))



//*****************************************************************************************************
/**
 * @desc UPDATED author
 * @method PUT
 * @route /api/author/:id
 * @access private (only admin)
 */


router.put('/:id',verifyTokenAndAdmin,asyncHandler(
    async(req, res) => {
        const {error} = validatePutAuth(req.body)
    
        if (error) {
         return   res.status(400).json({message: error.details[0].message})
        }
    
    
        const author=  await Author.findByIdAndUpdate(req.params.id,{
            $set:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                nationality:req.body.nationality,
                age:req.body.age,
            }
        },{new:true})
    res.status(200).json(author)
   
        
    
    }
))



//*****************************************************************************************************
/**
 * @desc delete author
 * @method delete
 * @route /api/author/:id
 * @access private (only admin)
 */


router.delete('/:id',verifyTokenAndAdmin,asyncHandler(
    async(req, res) => {
    
        
          const author = await Author.findById(req.params.id)
      
          if (author) {
                  await Author.findByIdAndDelete(req.params.id)
                res.status(200).json("author has been deleted")
          } else {
              res.status(400).json("author does not exist")
          }
      
      
      }
))















module.exports = router;