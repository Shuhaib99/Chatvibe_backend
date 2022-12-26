import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



//Registering a new User
export const registerUser = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashePass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hashePass
    })

    try {
        const user = await newUser.save()

        const token = jwt.sign({
            username: user.email, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '23h' })


        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//Login User
export const loginUser = async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {
                res.status(400).json("Wrong Password")
            } else {
                const token = jwt.sign({
                    username: user.email, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '23h' })
                // console.log(user, token); 
                res.status(200).json({ user, token })
            }
        }
        else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message }, "error on req.body in loginUser AuthController")
    } 
}



//..............Gooooogle....................


export const googleuser = async (req, res,next) => {
    //console.log(req.body);
    console.log("it is the backend of google login ")
    const email = req.body.email
    try {
        const User = await UserModel.findOne({ email: email })
        if (User) {
            console.log("user already exist")
            const token = jwt.sign({
                username: User.email, id: User._id
            },
                process.env.JWT_KEY, { expiresIn: "23h" })
            res.status(200).json({ User, token })
            console.log("tocken sented");

        } else {
            const User = await new UserModel({
                firstname: req.body.given_name,
                lastname: req.body.family_name,
                username: req.body.name,
                email: req.body.email,
                email_verified: req.body.email_verified,
                password:"google"
            }).save()
            const token = jwt.sign({
                username: User.email, id: User._id
            },
                process.env.JWT_KEY, { expiresIn: "23h" })
            res.status(200).json({ User, token })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
