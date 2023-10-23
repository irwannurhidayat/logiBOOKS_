const express = require('express')
const app = express ()
const dotenv = require('dotenv')
const cors = require('cors')
const CategoryRouter = require('./routes/category')
const AuthRouter = require('./routes/AuthRouter')
const morgan = require('morgan')
const cookieParse =require ('cookie-parser')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

dotenv.config();

//middleware
app.use(express.json())
app.use(cookieParse())

// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next()
// })

app.use(morgan("dev"))
app.use(cors())

//router categories
app.use('/api/v1/categories', CategoryRouter);
//route auth
app.use('/api/v1/auth', AuthRouter);

//middleware error handlers
app.use(notFound)
app.use(errorHandler)

//server
const port = process.env.PORT
app.listen(port, ()=>{
        console.log(`running to http://localhost:${port}/`);
});