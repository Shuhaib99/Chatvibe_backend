import mongoose from "mongoose";

const ImagePostSchema = mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        images: {
            type: String,
        },
        imagePID: {
            type: String
        },
        description: {
            type: String
        },

        comments: [{
            comment: {
                type: String
            },
            commentby:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            createdAt:
            {
                type: Date
            }
        }],
        likes: {
            type: Array
        },
        reaction: {
            type: Array
        }

    },
    { timestamps: true }
)

const ImagePostModel = mongoose.model('imageposts', ImagePostSchema)

export default ImagePostModel;