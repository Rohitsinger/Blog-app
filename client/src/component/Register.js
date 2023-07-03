import React, { useEffect, useState } from "react";
import "./css/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
// import { UserContext } from "../UserContext";
// import { useContext } from "react";


const Register = () => {
 
  const navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    email: "",

    password: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleValidation =()=>{
 
    const { name, email, password } = post;
 
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
  
  } else if(name.length<=3){
      toast.error("nameshould be greater than 3 characters",)
  }  else if(password.length<=6){
      toast.error("  greater than 6 characters",)
     return false;
    
  } else if(email===""){
    toast.error("email is necessary")
  
}
return true;
};
  const handleClick = async(e) => {
    e.preventDefault()
      const { name, email, password } = post;
     
 
      if (!name && !password && !email) {
        
       
        toast("Please Fill Name Email and Password",{
          position:"top-right",
          autoClose: 5000,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined,
          theme: "light"
   
        }
       
    ) } else if(name.length<=3){
      toast.error("name should be greater than 3 characters",)
  }  else if(password.length<=6){
      toast.error("  greater than 6 characters",)
     return false;
    
  } else if(email==="" && email.includes("@")){
    toast.error("email is necessary")
  
}
    else{
     await axios.post('/user/register',post).then(res=>console.log(res)).catch(err=>console.log(err))

     alert('posted')
   
    navigate("/signin")
    }
  
    

    }
      
   
  

  // useEffect(()=>{
  //   handleClick()
  // },[])

  return (

   
   <form className='w-full max-w-lg mx-auto mt-10'>
       <div className="flex flex-wrap -mx-3 mb-6 ">
          <img
            src="https://media.istockphoto.com/id/1058313796/photo/close-up-of-black-womans-hand-typing-on-the-laptop-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=eSJC1SX6j2tqcUHZU351X78xQ9pw85qubqUcgfWX0Yk="
            className="w-64 flex justify-center mx-auto"
          />
         
      
          
          <div className="w-2/3 md:w-1/2 px-3 mb-6 md:mb-0 mx-auto">
          <h2 className="brand">Register</h2>
            <input
              name="name"
              placeholder="Enter Name"
              value={post.name}
              autoComplete="off"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'"
            />
    
          
            <input
              name="email"
              placeholder="Enter E-mail"
              value={post.email}
              autoComplete="off"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'"
            />
        
       
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={post.password}
              autoComplete="off"
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'"
            />
         
         
         
          <button
            className="rounded-md bg-slate-600 w-32 p-2 m-2"
            onClick={handleClick}
          >
            Register
          </button>
          <h4>Sign in if you have Register</h4>
         
          <button
            className="rounded-md bg-green-500 w-32 p-2 m-2"
            onClick={() => navigate("/signin")}
          >
            Go to Signin
          </button>
          </div>
        </div>
        <ToastContainer/>
      </form>
     
      
  
  );
};

export default Register;
