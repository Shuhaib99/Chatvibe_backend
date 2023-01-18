import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";


//get a user
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json({ otherDetails, userid: req.userid })
        }
        else {
            res.status(404).json("No such User Exist")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const getCurrentUserByID = async (req, res, next) => {
    console.log("looking for response from current user");
    try {
        const userid = req.userid
        // console.log(userid,"currernt");
        const user = await UserModel.findById(userid)
        if (user)
            res.status(200).json({ user })
        else
            res.status(404).json("No User Exist")


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const followUser = async (req, res, next) => {
    //console.log(req.body.id, "Followwww");
    const id = req.body.id
    const userid = req.userid

    if (userid === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(userid)

            if (!followUser.followers.includes(userid)) {
                await followUser.updateOne({ $push: { followers: userid } })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("User followed")
            } else {
                res.status(403).json("User is Already followed you")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

}


export const unFollowUser = async (req, res, next) => {
    //console.log(req.body.id, "UnFollowwww");
    const id = req.body.id
    const userid = req.userid

    if (userid === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(userid)

            if (followUser.followers.includes(userid)) {
                await followUser.updateOne({ $pull: { followers: userid } })
                await followingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("User unfollowed")
            } else {
                res.status(403).json("User is not followed you")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export const getFollowers = async (req, res, next) => {
    try {

        const followers = await UserModel.find({ _id: req.params.id }).populate("followers", "-password").sort({ createdAt: -1 })
        if (followers) {
            res.status(200).json({ followers })
        } else {
            res.status(403).json("No such followers")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getFollowingUser = async (req, res, next) => {
    try {

        const following = await UserModel.find({ _id: req.params.id }).populate("following", "-password").sort({ createdAt: -1 })
        if (following) {
            res.status(200).json({ following })
        } else {
            res.status(403).json("No such following users")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updateUserProfile = async (req, res, next) => {
    try {
        console.log(req.body);
        const userid = req.userid
        if (req?.body?.profileImg?.option === "coverimage") {
            await UserModel.updateOne({ _id: userid }, { coverpic: req?.body?.profileImg?.image, coverpicPubID: req?.body?.profileImg?.imagePID })
        }
        else if (req?.body?.profileImg.option == "avatar") {
            console.log("inside avatar");
            await UserModel.updateOne({ _id: userid }, { profilepic: req.body.profileImg.image, profilepicPubID: req.body.profileImg.imagePID })
        }
        else console.log("Invalid data");
        res.status(200).json("Profile uploaded")

    } catch (error) {
        res.status(500).json(error)
    }
}


export const savePosts = async (req, res, next) => {

    const postid = mongoose.Types.ObjectId(req.body.postid)
    const userid = req.userid
    try {
        if (!req.body.savedpostdelete) {
            console.log("savePost");
            const user = await UserModel.findById(userid)
            if (!user.savedposts.includes(postid)) {
                await user.updateOne({ $push: { savedposts: postid } })
                res.status(200).json({ success: "Successfully added" })
            } else {
                res.status(200).json({ exist_post: true })
            }
        } else {
            console.log("Delete davedPost");
            const user = await UserModel.findById(userid)
            if (user.savedposts.includes(postid)) {
                await user.updateOne({ $pull: { savedposts: postid } })
                res.status(200).json({ success: "Successfully Deleted" })
            } else {
                res.status(200).json({ success: "Post not found" })
            }
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSavedPosts = async (req, res, next) => {
    try {

        const savedPosts = await UserModel.find({ _id: req.userid }).populate({ path: "savedposts", sort: { createdAt: -1 } })
        if (savedPosts) {
            res.status(200).json({ savedPosts })
        } else {
            res.status(403).json("No such savedPosts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        console.log("inside getUsers");
        const userId = mongoose.Types.ObjectId(req.userid);
      
        const searchResult = await UserModel.find({
            $and: [
                { _id: { $ne: userId } },
                { firstname: new RegExp("^" + req.params.data, "i") },
            ],
        });

        //firstname: new RegExp('^' + req.params.data, 'i')
        if (searchResult) {
            // console.log(userId,req.params.data.search,searchResult,"cvcvccvcvcccccv");
            res.status(200).json(searchResult);
        } else {
            res.status(400).json({ message: "No results" });
            throw new Error("No results");
        }
    } catch (error) {
        console.log("error", error);
    }
}