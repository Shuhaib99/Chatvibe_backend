import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    { 
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String

        },
        username: {
            type: String
        },

        email: {
            type: String,
            required: true
        },
       
        password: {
            type: String,
            required:true
        },
        email_verified:{
            type:Boolean
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesIn: String,
        worksAt: String,
        relationship: String,
        followers: [],
        following: []
    },
    { timestamps: true }
)

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;