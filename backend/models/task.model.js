import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assignedTo:{
        type:String,
        required:true

    },
    status:{
        type:Boolean,
        default:false,
        required:true

    },
    dueDate:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})

const Task =mongoose.model("task",taskSchema)
export default Task