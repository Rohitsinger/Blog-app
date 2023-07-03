const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
   
    title:{
        type:String,
        required:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'title is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: "Post",
        require:[true, "userid is require"]
    }
},{timestamps:true})

const blogModel = mongoose.model('Blog',blogSchema)

module.exports =blogModel