import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const verifyToken = async (req, res, next) => {
    try {
        // console.log(req.headers, "auth");
        let authHeader = req.headers.authorization
        // console.log(authHeader, "authhead");
        if (authHeader == undefined) {
            //res.status(401).send({error:"No token provided"})
            console.log("No token provided");
        } else {
            let token = authHeader.split(" ")[1] //or pop()
            // console.log(token, "tokensplit");
        }
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            console.log(decoded);
            req.body.token = decoded?.id
        }
        next()
    } catch (error) {
        console.log(error);
    }
}
export default verifyToken;