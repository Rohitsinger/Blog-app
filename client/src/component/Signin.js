import React,{useState} from 'react'
import axios from 'axios'
import './css/Register.css'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {authActions} from '../redux/store'
const Signin = () => {
 const dispatch = useDispatch()
 
const navigate = useNavigate()

  const [signin,setSignin] = useState({
    
    email:"",
    password:"",
  
})

const handleChange =(e)=>{
const {name,value } = e.target


setSignin(prev=>{
    return{
        ...prev,
        [name]:value
    }
})
}
  const handleValidation =()=>{
 
    const { email, password } = signin;
 
    if (!password) {
      toast.error("password and confirm password not same")
      // alert('Valid Email')
      toast("Password and email are incorrect",{
        position:"top-right",
        autoClose: 5000,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme: "light"
    // alert('Valid Email')
      }
     
  )
  
  
  }  else if(password.length<=6){
      toast.error("  greater than 6 characters",)
     return false;
    
  } else if(email===""){
    toast.error("email is necessary")
  
}
return true;
};


  const handleClick= async(e)=>{
    e.preventDefault()
    if(handleValidation){
      const {email,password} = signin
      if(email && password){
    const {data} = await axios.post('/user/signin',signin,
      //
       )
      //  .then(data=>{
        console.log( (data));
         
            
      
            localStorage.setItem("userId" ,( data.savedUser._id))
            
           
            dispatch(authActions.login());
            alert('posted')
            navigate('/blogs')
      } 
    
    }

        
    
  }  

  return (
    <form className='w-full max-w-lg mx-auto mt-10'>
       <div className="flex flex-wrap -mx-3 mb-6 ">
     
    
    <img className='w-64 flex justify-center mx-auto' src='https://media.istockphoto.com/id/1368151370/photo/user-typing-login-and-password-cyber-security-concept.jpg?b=1&s=170667a&w=0&k=20&c=wm6YUMs03Bup4_9XcQaX61L711qJxAUExEJp_PWO8gI=' alt='image'/>
   
     
    <br/>
    <div className='w-2/3 md:w-1/2 px-3 mb-6 md:mb-0 mx-auto'>
    <h2 className='font-medium font-sans mb-4'>Signin</h2>
           <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'  name="email" placeholder='Enter E-mail' value={signin.email} autoComplete="off" onChange={handleChange}/>
           <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'  type="password"  name="password" placeholder='Enter Password' value={signin.password} autoComplete="off" onChange={handleChange}/>
          
          
           <button className='rounded-md bg-slate-600 w-32 p-2 m-2 text-white ' onClick={handleClick}>Signin</button>
           <br/>
           <h5>If you didn't Register</h5>
          
           <button className='rounded-md bg-teal-700 w-32 p-2 m-2 text-white' onClick={()=>navigate('/register')}> Registration</button>
      </div>
 </div>
 <ToastContainer/>
    </form>
  )
}

export default Signin
