import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
 import {AiFillDelete} from 'react-icons/ai'
 import {MdOutlineEdit} from 'react-icons/md'
 import { Link } from 'react-router-dom'
import BlogDetails from './BlogDetails'

import './css/CreatePost.css'
const Blogs = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
 
   const[blogs,setBlogs]= useState([]);
   const [readMore, setReadmore] = useState(false);

  const toggle =(id)=>{
    setReadmore(!readMore)
    return id;
  }

const getAllBlogs =async()=>{
   try {
     const {data} = await axios.get(`/blog/all-blog?search=${searchTerm}`)
     if(data && data.success){
        setBlogs(data?.blog)
     }
   } catch (error) {
     console.log(error);
   }
}

useEffect(()=>{
    getAllBlogs();
},[searchTerm])


//sending blogid to BlogDetails so that ican get blog for update

const UserBlog =({isUser,id,name,image,title,description,updatedAt})=>{
  console.log(isUser,title);
  const handleSubmit=()=>{
    navigate(`/${id}`)
    // console.log(id);
 }

 //to delete the blog

 const handleDelete= async()=>{
   try {
    const {data} = await axios.delete(`blog/delete-blog/${id}`)
    if(data.success){
      alert('Blog deleted')
      navigate('/')
    }
   } catch (error) {
       console.log(error);
   }
 }

//


  return(

  <>
  <section className=" container mx-auto mr-2  border bg-white rounded-xl ">
       <div className='bg-gray-900 flex '>

<span className=' stroke-cyan-500 :hover text-white mt-1  '><FaUserCircle/> </span><br/>

<span className=' stroke-cyan-500 :hover text-sm  text-white ml-1 '>{name} </span><br/>
<span className='uppercase  text-md text-white font-semibold ml-16' >{updatedAt}</span>
{isUser && (
   <div className='flex justify-end mt-1 ml-4 sm:ml-4'>
   
    <MdOutlineEdit  onClick={handleSubmit} className='text-yellow-500 w-5'/>
   
    
   <AiFillDelete onClick={handleDelete} className='text-red-700  w-5'/>
   
   </div>
)}
</div>
     <div >
      <img className="object-cover rounded-lg w-96 contain mt-8  mb-8 " src={image}  />
      <div className=''>
      <div className="uppercase tracking-wide text-black font-semibold text-2xl ml-0 flex justify-start">{title}</div>
     
      <p className="mt-2 text-slate-500 font-serif flex justify-end"> {readMore?description.slice(0,30):description}</p>
     <button className="m-2 p-2 bg-teal-700 text-white mt-8 rounded-md" onClick={()=>toggle(id)}>{readMore?"Read More":"Read Less"}</button>
    </div>
      </div>
 
    </section> 
    </>
 )
}

let handleSearch;
  handleSearch = async () => {
  const {data} = await axios.post('/blog/search', {
  
   query: searchTerm
  });

if(data){
  setBlogs(data.blogs);
}
};

// useEffect(()=>{
//   handleSearch()
// },)
  
  return (
    <>
    <form className="flex items-center justify-end  ">   
    <label for="simple-search" className="sr-only">Search Blogs</label>
    <div className="relative mt-24 mr-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Blogs" required value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}/>
    
    </div>
    {/* <button type="submit" className="p-2.5  mt-24 mr-12 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSearch}>
        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Search</span>
        
    </button> */}
</form>
   <div className='grid grid-cols-1 lg:grid-cols-3 sm:mr-4 justify-items-center lg:gap-3 md:grid-cols-2 md:gap-2  w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    {blogs && blogs.map((item,index)=>(
      <UserBlog 
      
      id = {item?._id}
         isUser={(localStorage.getItem("userId"))===item.user._id}
        title={item?.title}
        description={item?.description}
        image={item?.image}
        name={item.user?.name}
        updatedAt={item.user.updatedAt}
      />
    ))}
      
    </div> 
    
</>

  )
}

export default Blogs;
