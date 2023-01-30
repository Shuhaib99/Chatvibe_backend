import mongoose from "mongoose";
import { object } from "yup";

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
            required: true
        },

        email_verified: {
            type: Boolean
        },
        isBlock: {
            type: Boolean
        },
        profilepic: String,
        profilepicPubID: String,
        coverpic: String,
        coverpicPubID: String,
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
            ref: "imageposts",
            createdAt:{
                type: Date
            }
        }],
        notification:[
            { type:Object}
        ]
    },
    { timestamps: true }
)

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;