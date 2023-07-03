const express = require('express')
const Router = express.Router();
const Blog = require('../models/BlogModel')
const { getAllBlogControllers, createBlogControllers, updateBlogControllers, getBlogControllers, deleteBlogControllers, getUserSingleBlog } = require('../controllers/blogController');
//Routes 
//Get all Blogs
Router.get('/all-blog',getAllBlogControllers)
 
//Post all-Blogs
Router.post('/create-blog',createBlogControllers)

//update all-Blogs
Router.put('/update-blog/:_id',updateBlogControllers)
//Get || single blog details

Router.get('/single-blog/:id',getBlogControllers)

//delete all-Blogs

Router.delete('/delete-blog/:id',deleteBlogControllers)

//Get User Blog

Router.get('/user-blog/:id',getUserSingleBlog);



module.exports = Router