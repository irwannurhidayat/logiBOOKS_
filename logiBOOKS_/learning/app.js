const express = require('express');
const app = express ();
const dotenv = require('dotenv')
const cors = require('cors')
const CategoryRouter = require('./routes/category');
const AuthRouter = require('./routes/AuthRouter');
const morgan = require('morgan');

dotenv.config();

//middleware
app.use(express.json())
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next()
// })

app.use(morgan("dev"))
app.use(cors())

//route auth
app.use('/api/v1/auth', AuthRouter);

//router categories
app.use('/api/v1/categories', CategoryRouter);


//server
const port = process.env.PORT
app.listen(port, ()=>{
        console.log(`running to http://localhost:${port}/`);
});