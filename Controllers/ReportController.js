import mongoose from "mongoose";
import ImagePostModel from "../Models/imagePosts.js";
import ReportModel from '../Models/ReportModel.js'

export const addReport = async (req, res, next) => {
    try {
        const userid = req.userid
        const postid = req.body.postid
        const reason = req.body.reason
        const report_action = false

        const hasReport = await ReportModel.findOne({ userid: mongoose.Types.ObjectId(userid), postid: mongoose.Types.ObjectId(postid) })
        if (!hasReport) {
            const post = await ImagePostModel.findOne({ _id: mongoose.Types.ObjectId(postid) })
            if (post) {
                const report = new ReportModel({ userid, postid, reason, report_action })
                const savedreport = await report.save()
                if (savedreport) {
                    res.status(200).json({ report_post: true })
                } else {
                    res.status(400).json("Couldn't save")
                }
            } else {
                res.status(200).json({ report_post: false })
            }
        }else{
            res.status(200).json({has_report: true })
        }

    } catch (err) {
        res.status(500).json(err)
    }

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
            console.log(req.body.reportid, "Reportid");
            await ReportModel.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reportid) })
            resolve({ delStatus: true })

        } catch (err) {
            reject(err)
        }
    })
}
