
import mongoose, { mongo, Mongoose } from "mongoose";
import ImagePostModel from "../Models/imagePosts.js";
import UserModel from "../Models/userModel.js";

export const imagePost = async (req, res, next) => {

    const data = {
        userid: req.userid,
        description: req.body.newPost.desc,
        images: req.body.newPost.image,
        imagePID: req.body.newPost.imagePID

    };
    const post = new ImagePostModel(data);
    await post.save().then(async () => {
        const user = await UserModel.findOne({ id: data.userid });
        res.status(200).send({ success: true, user: user });
        console.log("data saved...");
    })
        .catch((err) => {
            res.status(500).send({ success: false });
            console.log("ERROR", err);
        })

}

export const getPosts = async (req, res, next) => {
    console.log("Posts time begin");
    try {
        const posts = await ImagePostModel.find().populate("userid", "-password").populate("comments.commentby", "-password").sort({ createdAt: -1 })
        //console.log(posts,"postttttttt");
        if (posts) {
            // posts.userid=req.userid
            // console.log(posts.userid,"lklkljfdshjdhfdklsjfkldsjfdklsfjkld")
            res.status(200).json({ posts, userid: req.userid })
        }
        else {
            res.status(404).json("No such posts Exist")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const likePost = async (req, res, next) => {

    const id = req.body.postid
    const userid = req.userid

    try {
        const post = await ImagePostModel.findById(id)
        if (!post.likes.includes(userid)) {

            await post.updateOne({ $push: { likes: userid } })
            const likes = post.likes
            res.json({ likes })
        }
        else {

            await post.updateOne({ $pull: { likes: userid } })
            const likes = post.likes
            res.json({ likes })
            // res.status(200).json("Post Unliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const commentPost = async (req, res, next) => {
    const postid = mongoose.Types.ObjectId(req.body.id)
    let user = req.userid

    const userid = user
    const comment = req.body.commentText
    try {
        await ImagePostModel.updateOne({ _id: postid }, { $push: { comments: { comment: comment, commentby: userid, createdAt: new Date() } } })
        res.json({ status: true })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
}

export const getPostsById = async (req, res, next) => {

    const userid = mongoose.Types.ObjectId(req.params.id)
    // console.log(userid, "PostsById time begin");
    try {
        const posts = await ImagePostModel.find({ userid: userid }).
            populate("userid", "-password").populate("comments.commentby", "-password").sort({ createdAt: -1 })
        //const posts = await ImagePostModel.find({userid:userid})
        console.log(posts, userid, "post just ow");
        if (posts) {
            // posts.userid=req.userid
            console.log(posts, "success")
            res.status(200).json({ posts, userid: req.userid })
        }
        else {
            res.status(404).json("No such posts Exist")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// export const getComment = () => async (req, res, next) => {
//     postid = req.params.postid
//     userid = req.userid

//     try {
//         const comments = await ImagePostModel.findOne({ _id: postid },{comments:1}).populate("users")
//         console.log(comments,"Comments");
//         res.json({ comments: comments.commentby })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)

//     }
// }

export const deletePost = async (req,res,next) => {
    console.log(req.body.postid,"deletion");
    try {
        return new Promise(async (resolve, reject) => {
            await ImagePostModel.deleteOne({ _id: mongoose.Types.ObjectId(req.body.postid.postid) })
            resolve({status : true})
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}