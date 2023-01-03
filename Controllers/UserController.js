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
        }else{
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
        }else{
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
