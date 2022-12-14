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

        profilepic: String,
        profilepicPubID:String,
        coverpic: String,
        coverpicPubID:String,
        about: String,
        city: String,

        followers: [{
            type: mongoose.Schema.Types.ObjectId,
                ref: "users"
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }],
        savedposts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "imageposts"
        }]
    },
    { timestamps: true }
)

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;