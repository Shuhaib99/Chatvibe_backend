import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../Models/userModel.js'
import mongoose from 'mongoose'


dotenv.config()

const verifyToken = async (req, res, next) => {
    let token
    try {
        let authHeader = req.headers.authorization
        if (authHeader == undefined) {
            res.status(401).send({ error: "No token provided" })
            // res.status(200).json({tokenExp:true})
        } else {
            token = authHeader.split(" ")[1] //or pop()  
            // console.log("split token");
        }
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.userid = decoded?.id
        }

        // const user = await UserModel.findById({ _id: mongoose.Types.ObjectId(req.userid), isBlock: false })
        // console.log(user,"user");
        // if (user) {
            next()
        // } else {
        //     console.log("Blocked user");
        //     res.status(200).send({ isBlock: "BlockedUser" })
        // }
    } catch (error) {
        res.status(500).send({ error: "Token Expired" })
    }
}


export default verifyToken;