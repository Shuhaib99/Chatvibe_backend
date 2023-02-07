import ChatModel from '../Models/ChatModel.js'

export const createChat = async (req, res, next) => {
    console.log(req.body);
    const senderid = req.userid
    const newChat = new ChatModel({
        members: [senderid, req.body.recieverid]
    })

    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.userid, req.body.recieverid] }
        })
        if (!chat) {
            const result = await newChat.save()
            res.status(200).json({ result: result })
        } else {
            res.status(200).json({ result: chat })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userChats = async (req, res, next) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.userid] }
        })
        res.status(200).json({ chat, user: req.userid })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const findChat = async (req, res, next) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.userid, req.params.secondId] }
        })
        res.status(200).json({ chat: chat })
    } catch (error) {
        res.status(500).json(error)
    }
}