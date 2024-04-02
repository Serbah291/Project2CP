const express = require('express')
const joi = require('joi')
const router = express.Router()
const {Book,validationBook,validationPutBook} = require('../models/Book')
const asyncHandler = require('express-async-handler')
const  { verifyTokenAndAdmin } = require('../middlewares/verifyToken') ;


/**
 * @desc get all books
 * @route /api/books 
 * @method GET 
 * @access public
 */

router.get('/',asyncHandler(
    async(req, res) => {     
            const bookList = await Book.find().populate("author",["first_name", "last_name"])
            res.json(bookList)
        
    }
))


/**
 * @desc get  books by id
 * @route /api/books/:id 
 * @method GET 
 * @access public
 */

router.get('/:id', asyncHandler(
    async(req, res) => {
        const book = await Book.findById(req.params.id)
        if (book) {
            res.status(200).json(book)
        } else {
            res.status(404).json({ message: 'Not Found'})
        }
    }
))


/**
 * @desc add a book
 * @route /api/books 
 * @method post 
 * @access private  (only admin)
 */
router.post('/', verifyTokenAndAdmin,asyncHandler(
    async(req, res) => {

        const {error} = validationBook(req.body)
     
     
     if (error) {
         return res.status(400).json( {message:error.details[0].message} )
     }
         const book = new Book({
             title:req.body.title,
             author:req.body.author,
         })
         
       const result=await  book.save()
         res.status(201).json(book)
     
       
     
     }
))


/**
 * @desc Update a book
 * @route /api/books/:id 
 * @method PUT 
 * @access private (only admin)
 */
router.put('/:id',verifyTokenAndAdmin,asyncHandler(
    async(req, res) => {
        const {error} = validationPutBook(req.body)

        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const book = await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                title: req.body.title,
                author: req.body.author,
            }
        },{new: true})
      
        res.status(200).json(book)
         
     }
))
 

/**
 * @desc delete a book
 * @route /api/books/:id 
 * @method PUT 
 * @access private (only admin)
 */
router.delete('/:id',verifyTokenAndAdmin,asyncHandler(
    async(req, res) => {

        const book = await Book.findById(req.params.id)
     
         if (book) {
            await Book.findByIdAndDelete(req.params.id)
             res.status(200).json("book has been deleted")
         } else {
             res.status(404).json("book not found")
         }  
     
     }
) )
 


module.exports = router;