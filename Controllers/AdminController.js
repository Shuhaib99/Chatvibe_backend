import mongoose from "mongoose";
import ReportModel from "../Models/ReportModel.js";
import UserModel from "../Models/userModel.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({}, { _id: 1, firstname: 1, lastname: 1, isBlock: 1, profilepic: 1, email: 1, total_followers: { $size: "$followers" }, total_following: { $size: "$following" } })
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(200).json({ isUsers: false })
        }

    } catch (error) {
        console.log("error", error);
    }
}


export const blockUser = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
      console.log(req.body);
        try {
            if (req.body.isBlock == false) {
                await UserModel.updateOne({ _id: req.body.userid }, { isBlock: true })
                //resolve({ isBlock: true })
                  res.json({ isBlock: true })
            } else {
                await UserModel.updateOne({ _id: req.body.userid }, { isBlock: false })
                //resolve({ isBlock: false })
                res.json({ isBlock: false })
            }
        } catch (error) {
            reject(error)
        }
    })

}

export const getReport = async (req, res, next) => {
    try {
        const report = await ReportModel.find({ report_action: false }).populate({ path: "userid", select: { 'firstname': 1, 'lastname': 1, "profilepic": 1 } })
            .populate({ path: "postid", select: { 'userid': 1 }, populate: { path: "userid", select: { 'firstname': 1, "lastname": 1, "profilepic": 1 } } })
            .sort({ createdAt: -1 })
        if (report) {
            res.status(200).json({ report })
        } else {
            res.status(400).json("Couldn't get report")
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteReport = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(req.body.reportid, "Reportid");
            await ReportModel.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reportid) })
            resolve({ delStatus: true })

        } catch (err) {
            reject(err)
        }
    })
}