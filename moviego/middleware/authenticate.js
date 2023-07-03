const jwt = require('jsonwebtoken')
// const Post = require('../models/userSchema')
const mongoose = require('mongoose')
const Post = mongoose.model('Post')

// const authenticate = async(req,res,next)=>{
//     try {
        
//         const token = req.cookies.jwtoken;
        
//         const verifyToken =  jwt.verify(token,process.env.SECRET_KEY);

//         const rootUser = await Post.findOne({_id:verifyToken._id, "tokens.token":token})
//        console.log(rootUser);
//         if(!rootUser){throw new Error("User not found")}

//         req.token = token
//         req.rootUser = rootUser
//         req.userId = rootUser._id

//         next();
//     } catch (error) {
//         res.status(401).send("unAuthorize user")
//     console.log(error);
//     }

   
// }

const authenticate = async(req,res,next)=>{
  const {authorization} = req.headers
  console.log(authorization);
  if(!authorization){
    return res.status(401).json({
        
        error:"You Must be logged in"
    })
    
}
const token = authorization.replace("Bearer ","")
console.log(token);
jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
    if(err){
        return res.status(401).json({
          
            error:"You Must be logged in",
        })

    }
    const {_id} = payload
   Post.findById(_id).then(userData=>{
    req.user = userData;
   })
   next()
})

}
module.exports = authenticate