import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const BlogDetails = () => {
  const navigate = useNavigate()
    const [blog,setBlog] = useState({})
    const id = useParams().id
    console.log(id);
    const [createPost,setCreatePost] = useState({
    
    
  })
    //get BlogDetails
     
    const getBlogDetails = async()=>{
        try {
            const {data} = await axios.get(`/blog/single-blog/${id}`)
            if(data?.success){
                setBlog(data?.userBlog);
                setCreatePost({
                  title: data?.blog.title,
                  description: data?.blog.description,
                  image: data.blog.image,
                 })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getBlogDetails()
    },[id])
    // console.log(blog);

  
  
  const handleChange =(e)=>{
  const {name,value } = e.target
  
  
  setCreatePost(prev=>{
      return{
          ...prev,
          [name]:value
      }
  })
  }
  
  const handleSubmit = async(e)=>{
      e.preventDefault();
    //  const {title,description,image} = createPost
    
        try {
          const {data} = await axios.put(`blog/update-blog/${id}`,{
           
            title:createPost.title,
            description:createPost.description,
            image:createPost.image,
            user:id,
           
          })
          
          if(data?.success){
            alert('blog Updated')
           
            navigate('/')
            
          
          }
  
        } catch (error) {
          console.log(error);
        }
     
  }
    useEffect(() => {
     
      handleSubmit()
    
      
    }, [])
    // console.log(id);
  return (
    <>
     <form className='w-full max-w-lg mx-auto mt-32'>
    <div className="shadow-none bg-gradient-to-br from-rose-200 via-red-100 to-teal-500  flex flex-wrap -mx-3 mb-6 rounded ">
  
 
 <div className='w-2/3 md:w-1/2 px-3 mb-6 md:mb-0 mx-auto'>
  <h2 className='font-medium font-sans mb-4'>Update Post</h2>
        <input className='appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'  name="title" placeholder='Enter a title' value={createPost.title} autoComplete="off" onChange={handleChange} required/>
        <input className='appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'  type="description"  name="description" placeholder='Enter Description' value={createPost.description} autoComplete="off" onChange={handleChange} required/>
        <input className='appearance-none block w-full  text-gray-700 border border-red-500 file:rounded-full  leading-tight focus:outline-none file:cursor-pointer file:shadow-lg file:shadow-gray-400/50 file:bg-gradient-to-b file:from-gray-300 file:to-gray-400 file:px-6 file:py-3 file:border-none file:focus:outline-none rounded py-3 px-4 mb-3'  name="image" placeholder='Upload image' value={createPost.image}  autoComplete="off" onChange={handleChange} required/>
        <br/>
       
        <button className='rounded-md bg-slate-600 w-32 p-2 m-2 text-white' onClick={handleSubmit} >Update Post</button>
     
      
   </div>
</div>

 </form>
  
     
    </>
  )
}

export default BlogDetails
