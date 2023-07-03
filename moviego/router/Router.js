const jwt = require('jsonwebtoken')
const express = require('express')
const Router = express.Router();
const bcrypt = require('bcryptjs')
const  mongoose  = require('mongoose');
const Post = require('../models/userSchema')

const authenticate = require('../middleware/authenticate');


//using Promises
// Router.post('/register', (req,res)=>{
//   const {name,email,password,confirmPassword} = req.body;

//   if(!name || !email || !password || !confirmPassword){
//      return res.status(422).json({error:"Please fill the feilds Properly"})
//   }
 
//   Post.findOne({email:email})
//   .then((userExist)=>{
//     if(userExist){
//       return res.status(422).json({error:"Email already exist"})
//     }
//     const post = new Post({name,email,password,confirmPassword})

//     post.save().then(()=>{
//       res.status(201).json({message:"user registered successfully"}).catch((err)=>res.status(500).json({error:"Failed to register"}))
//     })
//   }).catch((err)=>console.log(err));
// })

//using async await
Router.post('/register', async (req,res)=>{
  const {name,email,password} = req.body;
console.log(req.body);
  if(!name || !email || !password ){
     return res.status(422).json({error:"Please fill the feilds Properly"})
   
  }

  Post.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser){
      return res.status(422).json({error:"User already exist"})
    }
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
      const user = new Post({
        name,
        email,
        password:hashedPassword,
        // blogs:[]
   })
   user.save()
   .then(user=>{
     res.json({message:"user saved successfully"})
   })
    })
    .catch(err=>console.log(err));
   
  })
 
  // try {
  // const userExist = await Post.findOne({email:email})
    
  //    if(userExist){
  //       return res.status(422).json({error:"Email already exist"})
  //     }
  //     const post = new Post({name,email,password})

  //     const userRegistration = await post.save()

  //     if(userRegistration){
  //       res.status(201).json({message:"user registered successfully"})
  //     }else{
  //       res.status(500).json({error:"Failed to register"})
  //     }
      
  // } catch(err){
  //   console.log(err);
  // }


})

Router.post('/signin',async(req,res)=>{

  const {email,password} = req.body;
  if(!email || !password){
    return res.status(401).json({error:"fill all the Credentials"})
  }
  Post.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser){
      return res.status(422).json({ error:"Invalid Credentials"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(domatch=>{
      if(domatch){
           const token =  jwt.sign({_id:savedUser._id},process.env.SECRET_KEY)
           console.log(token);
           const {_id,name,email} = savedUser
         console.log(savedUser);
          return res.status(201).json({token,savedUser})
      }
    })
  })

//   try {
    
//     const {email,password} = req.body

//     if(!email || !password){
//     return res.status(400).json({error:"Please fill the data"})
//    }

//    const userLogin = await Post.findOne({email:email})
   
//    if(userLogin){//if userlogin then check for password
//     const isMatch = await bcrypt.compare(password,userLogin.password)

//    const token =  jwt.sign({_id:userLogin._id},process.env.SECRET_KEY)
//    res.json({token})

// //   let token = await userLogin.generateAuthToken()
// // console.log(token);

// //  res.cookie("jwtoken",token ,{
// //   expires: new Date(Date.now() + 25892000000),//when to expire
// //   httpOnly:true//where to store
// //  })

//     if(!isMatch){
//      res.status(400).json({error:"invalid credentials"})
//     }else{
//      res.json({message:"user Signin Successfully"})
//     }


//    }else{
//     res.status(400).json({error:"user Error"})
//    }
//     } catch (error) {
//     console.log(error);
//   }
 })





 //about us page 
// Router.get('/about',authenticate,(req,res)=>{
//   console.log(req.body)

//   console.log("this is an home page");
//   res.send(req.rootUser)
// })

Router.get('/protected',authenticate,(req,res)=>{
  res.send("Hello");

  // res.json({message:"this is an home page"});
  // res.send(req.rootUser)
})


module.exports = Router;

