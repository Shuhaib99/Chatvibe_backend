import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"; 
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import cors from 'cors'
import morgan from 'morgan'

//Routes
const app = express();
app.use(cors());
app.use(morgan('tiny'))
//Middleware
app.use(bodyParser.json({limit:'30mb', extended:true }));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true }))

dotenv.config()

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>app.listen(process.env.PORT,()=>console.log(`Listening at ${process.env.PORT} `)))
.catch((error)=>console.log("Database Connecting Error",error))


//usage of routes
app.use('/auth',AuthRoute)
app.use('/user', UserRoute)
app.use('/posts',PostRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)
