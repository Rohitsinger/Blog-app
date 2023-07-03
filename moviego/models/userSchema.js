const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
// import { ObjectId } from 'mongoose';
const userSchema = new mongoose.Schema({
    
    name:{
        type:"string",
        required: true
    },
    email:{
        type:"string",
        required: true
    },
     password:{
        type:"string",
        required: true
    },
   
   blog:[
    {
        type:mongoose.Types.ObjectId,
        ref:"Blog"
    }
   ],
   
    // tokens:[
    //    {
    //     token:{
    //         type:"string",
    //         required: true
    //     }
    //    }
    // ]


},
{timestamps:true},
)


//hashing Passwords

// userSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password= await bcrypt.hash(this.password,12)
//         this.confirmPassword=await bcrypt.hash(this.password,12)
//     }
//     next()
// });

// //We are generating Token
// userSchema.methods.generateAuthToken = async function(){
//     try {
//        let token = jwt.sign({_id:this._id},  process.env.SECRET_KEY) //token generated
//        this.tokens = this.tokens.concat({token:token})//token added
//        this.save();//saving token
//        return token;
//     } catch (error) {
//         console.log(error);
//     }
// }

const Post = mongoose.model("Post",userSchema)

module.exports=Post;