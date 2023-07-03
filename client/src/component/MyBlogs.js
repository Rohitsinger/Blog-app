import React, { useEffect, useState } from "react";
import axios from "axios";
// import './css/Home.css'
import { Link } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa'
const MyBlogs = () => {
  const [blogs,setBlogs]= useState([])
  const [readMore, setReadmore] = useState(false);

  const toggle =()=>{
    setReadmore(!readMore)
  }
  // get user blogs
  const getUserBlog = async()=>{
     try {
       const id = localStorage.getItem("userId")
      
        const {data} = await axios.get(`/blog/user-blog/${id}`)
        console.log(id);
        console.log(data);
        if(data?.success){
          setBlogs(data?.userBlog.blog)
        }
     } catch (error) {
        console.log(error);
     }  
  }

  useEffect(()=>{
    getUserBlog()
  },[])
  console.log(blogs);

  const Blog =({isUser,name,image,title,description,updatedAt})=>{
    // console.log(isUser);
    return(
    <>
         <section className=" container mx-auto mr-2  border bg-white rounded-xl ">
       <div className='bg-gray-900 flex '>

<span className=' stroke-cyan-500 :hover text-white mt-1  '><FaUserCircle/> </span><br/>

<span className=' stroke-cyan-500 :hover text-sm  text-white ml-1 '>{name} </span><br/>
<span className='uppercase  text-md text-white font-semibold ml-16' >{updatedAt}</span>

</div>
     <div >
      <img className="object-cover rounded-lg w-96 contain mt-8  mb-8 " src={image}  />
      <div className=''>
      <div className="uppercase tracking-wide text-black font-semibold text-2xl ml-0 flex justify-start">{title}</div>
     
      <p className="mt-2 text-slate-500 font-serif flex justify-end"> {readMore?description.slice(0,30):description}</p>
     <button className="m-2 p-2 bg-teal-700 text-white mt-8 rounded-md" onClick={toggle}>{readMore?"Read More":"Read Less"}</button>
    </div>
      </div>
 
    </section> 
    </>
    )
  }

   return (
     <>
     <div className="grid grid-cols-1 lg:grid-cols-3 sm:mr-4 justify-items-center lg:gap-3 md:grid-cols-2 md:gap-2  w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {blogs && blogs.length > 0 ?(blogs.map((item,index)=>(
       <Blog 
        id = {item._id}
        isUser={true}
        title={item?.title}
        description={item?.description}
        image={item?.image}
        name={item.user?.name}
        updatedAt={item.updatedAt}
       />
      )))
          :(
            <h1 className="m-6 p-4 flex justify-center text-teal-700">You Haven't Created Any Post</h1>
          )
          }
          </div>
     </>
  );
};

export default MyBlogs;
{/* <Blog 

/> */}

          