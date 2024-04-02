const { json } = require('body-parser');
const express = require('express');
const logger = require('./middlewares/logger');
const {notFound, errorHandler} = require('./middlewares/errors');
require('dotenv').config();
const connectToDb = require('./config/db');

// Init App
const app = express();

// connection to MongoDB
connectToDb()

// Apply Middleware
app.use(logger)
app.use(express.json())

// Routes
app.use("/api/books",require('./routes/books'));
app.use("/api/authors",require('./routes/authors'));
app.use("/api/auth",require('./routes/auth'));
app.use("/api/user",require('./routes/user'));



//Error handler Middleware
app.use(notFound)

app.use(errorHandler)



//Running the server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on mode ${process.env.NODE_ENV} on port ${process.env.PORT}`);
})






