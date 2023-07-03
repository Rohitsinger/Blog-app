
const express = require('express')
const cors = require('cors');

const { mongoose } = require('mongoose');
const app = express()
const cookieParser = require('cookie-parser')
// const session = require('express-session')
require('dotenv').config();

//sid:signature

app.use(express.json());
app.use(cors())
// app.use(session({
//     secret:"thisismysecretkeyanyonewant",
//     cookie:{
//         sameSite:'strict'
//     }
// }))

//
app.use(cookieParser())

mongoose.connect(process.env.DB)
jwtSecret = process.env.SECRET_KEY
const Post = require('./models/userSchema');

//import routes
const userRouter = require('./router/Router')
const blogRoutes = require('./router/BlogRouter')

//links routes
app.use('/user',userRouter)
app.use('/blog',blogRoutes)


const Port = process.env.PORT||5000;

app.listen(process.env.PORT,()=>{
    console.log("running on a port 5000", Port);
});

module.exports = app;

