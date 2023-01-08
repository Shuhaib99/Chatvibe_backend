import MessageModel from "../Models/MessageModel.js";

export const addMessage = async(req,res,next) => {
    const senderid =req.userid
    const {chatid,text } = req.body
    const message = new MessageModel({
        chatid,
        senderid,
        text

    })
    try{
        const result =await message.save()
        res.status(200).json(result)
    }catch (error) {
        res.status(500).json(error)
    }
}


export const getMessages = async(req,res,next)=>{
    const {chatid}=req.params
    try
    {
     const result = await MessageModel.find({chatid})   
    }catch (error) {
        res.status(500).json(error)
        res.status(200).json(result)
    }
}