const express = require('express')

const userSchema = require('../models/userSchema')
const blogModel = require ('../models/BlogModel');
const Blog = require('../models/BlogModel')
const  mongoose  = require('mongoose');

//Get All Blogs 

const getAllBlogControllers= async(req,res)=>{
    try {
       const search = req.query.search ||  "";
       const query = {
           title:{$regex:search,$options:"i"},
           description:{$regex:search,$options:"i"}
       }
        const blog = await blogModel.find(query).populate("user")
       
        if(!blog){
         return res.status(200).send({
             success:false,
             message:"No Blogs Found",
             
         })
         
        }
        return res.status(200).send({
         success:true,
         BlogCount : blog.length,
         message:"All Blogs List",
         blog,
     })
     } catch (error) {
         console.log(error);
         return res.status(500).send({
             success:false,
             message:"Error while getting Blog",
             error,
         })
     }
}
   



//create Blog
const createBlogControllers=async(req,res)=>{
    try {
       const {title,description,image,user} = req.body
       console.log(req.body);
       if(!title || !description || !image || !user){
           return res.status(401).send({
               message:"Fill all data",
               success:false,
           });
       }
       const existingUser = await userSchema.findById(user)
       console.log(user);
       if(!existingUser){
           return res.status(404).send({
               message:"Unable to find user",
               success:false,
               
           });
       }

       const newBlog = new blogModel({title,description,image,user});
       const session = await mongoose.startSession();
       session.startTransaction();
       await newBlog.save({session});
       existingUser.blog.push(newBlog);
       await existingUser.save({session});
       await session.commitTransaction();
       await newBlog.save();
       return res.status(201).send({
           success:true,
           message:"Blog created",
           newBlog,
       })

    } catch (error) {
       console.log(error);
       return res.status(500).send({
           success:false,
           message:"Error Created while posting Blog",
           error,
       })
    }
}

//upsate all Blogs by id
const updateBlogControllers=async(req,res)=>{
    const {_id} = req.params
    console.log("id is",_id);
    const {title,description,image} = req.body;
   console.log(req.body);
    try {
      
       const blog =  await Blog.findByIdAndUpdate(_id,{title,description,image},{new:true});
      
        return res.status(200).send({
            success:true,
            message:"Blog updated",
             blog,
        })

     } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error Created while updating Blog",
            error,
        })
     }
}

//Single Blog

const getBlogControllers=async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id);
        // const {title,description,image} = req.body;
       
       const blog = await blogModel.findById(id);
       console.log(blog);
      if(!blog){
        return res.status(404).send({
            success:false,
            message:" Blog not found with this id",
      })
    }
    return res.status(200).send({
        success:true,
        message:"Blog updated",
         blog,
    })
    }catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error Created while updating Blog",
            error,
        })
     }
}

//Delete Blog
const deleteBlogControllers=async(req,res)=>{
    const id =  req.params.id
    console.log(id);
    let blog;
    try {
      
 blog = await Blog.findByIdAndRemove(id).populate("user");
 await blog.user.blog.pull(blog)
await blog.user.save()
console.log(blog)
// await blog.user.save()
 } catch (error) {
        console.log(error);
        
    
     }
   if(!blog){
    return res.status(500).json({message:"Unable To Delete"})
   }
    
     return res.status(200).json({
    success:true,
    message:"Blog deleted",
    
})
        
}

//Get User Blog

const getUserSingleBlog = ('/user-blog/:id',async(req,res)=>{
    let userBlog;
   let userId = req.params.id
   console.log(userId);
   try {
       userBlog = await userSchema.findById(userId).populate('blog');
       console.log(userBlog);
      if(!userBlog){
     return res.status(404).send({
        success:false,
        message:"blogs not found in user Blog",
       
    })
      }
      return res.status(200).send({
        success:true,
        message:"blogs found in user Blog",
        userBlog
    })
   } catch (error) {
     console.log(error);
    return res.status(500).send({
        success:false,
        message:"error in user Blog",
        error
    })
   }
})



module.exports = {getAllBlogControllers,createBlogControllers,updateBlogControllers,getBlogControllers,deleteBlogControllers,getUserSingleBlog}