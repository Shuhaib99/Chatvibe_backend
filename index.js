import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import AdminRoute from './Routes/AdminRoute.js'
import ReportRoute from './Routes/ReportRoute.js'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server } from 'socket.io'

//Routes
const app = express();
// app.use(cors());
app.use(morgan('tiny'))
//Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

dotenv.config()
//app.listen(process.env.PORT, () => 
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Listening at ${process.env.PORT} `))
    .catch((error) => console.log("Database Connecting Error", error))

app.use(
    cors({
        // origin: "http://localhost:3000",
        // origin: ["https://chatwibe.netlify.app", "http://localhost:3000"],
        origin: ["http://localhost:3000"]
        // credentials:true
    })
);

//usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/super', AdminRoute)
app.use('/report', ReportRoute)

//Socket setup
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        // origin: "http://localhost:3000",
        // origin: ["https://chatwibe.netlify.app", "http://localhost:3000"],
        origin: ["http://localhost:3000"]
    }
})

let activeUsers = [];

io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId) => {

        if (!activeUsers.some((user) => user.userId === newUserId)) {
            console.log(activeUsers, "active");
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            // console.log("New User Connected", activeUsers);
        }

        io.emit("get-users", activeUsers);
    })
    // send message to a specific user
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        // console.log("Sending from socket to :", receiverId)
        //console.log("Data: ", data)
        if (user) {

            io.to(user.socketId).emit("receive-message", data);
            //console.log(user, "Yes");
        }
    });


    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        //console.log("User Disconnected", activeUsers);
        io.emit("get-users", activeUsers);
    });

})

httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
})
