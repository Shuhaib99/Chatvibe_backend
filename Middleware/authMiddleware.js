import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const verifyToken = async (req, res, next) => {
    let token
    
    try {

        let authHeader = req.headers.authorization
        if (authHeader == undefined) {
            //res.status(401).send({error:"No token provided"})
        } else {
            token = authHeader.split(" ")[1] //or pop()  
            // console.log("split token");
        }

        if (token) {

            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.userid = decoded?.id
        }
        next()
    } catch (error) {
        res.status(500).send({ error: "Token Expired" })
    }
}
export default verifyToken;