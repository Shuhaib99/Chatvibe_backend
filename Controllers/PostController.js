
import mongoose from "mongoose";
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
        const posts = await ImagePostModel.find().populate("userid", "-password").sort({ createdAt: -1 })
        if (posts) {
            // posts.userid=req.userid
            // console.log(posts.userid,"lklkljfdshjdhfdklsjfkldsjfdklsfjkld")
            res.status(200).json({posts,userid:req.userid})
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
            const likes=post.likes           
            res.json({likes})
        }
        else {
            
            await post.updateOne({ $pull: { likes: userid} })
            const likes=post.likes     
            res.json({likes})
           // res.status(200).json("Post Unliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}