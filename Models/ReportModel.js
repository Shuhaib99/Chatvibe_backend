
import mongoose from "mongoose";

const ReportSchema = mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"users"
        },
        postid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"imageposts"
        },
        reason:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const ReportModel = mongoose.model("report",ReportSchema)
export default ReportModel