import UserModel from "../Models/userModel.js";


//get a user
export const getUser = async (req, res) => {
    console.log(req.params.id,"getuser");
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
        }
        else {
            res.status(404).json("No such User Exist")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const followUser=async(req,res)=>{
    const id=req.params.id
    const userid=req.userid

    if(userid===id){
        res.status(403).json("Action forbidden")
    }else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser= await UserModel.findById(userid)

            if(!followUser.followers.includes(userid)){
                await followUser.updateOne({$push : {followers : userid}})
                await followingUser.updateOne({$push : {following : id}})
                res.status(200).json("User followed")
            }else{
                res.status(403).json("User is Already followed you")
            }

        }catch(error){
            res.status(500).json(error)
        }
    }

}


export const unFollowUser=async(req,res)=>{
    const id=req.params.id
    const userid=req.userid

    if(userid===id){
        res.status(403).json("Action forbidden")
    }else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser= await UserModel.findById(userid)

            if(followUser.followers.includes(userid)){
                await followUser.updateOne({$pull : {followers : userid}})
                await followingUser.updateOne({$pull : {following : id}})
                res.status(200).json("User unfollowed")
            }else{
                res.status(403).json("User is not followed you")
            }

        }catch(error){
            res.status(500).json(error)
        }
    }

}



