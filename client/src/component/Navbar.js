import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../redux/store'
import { FaTimes,FaBars } from 'react-icons/fa'

const Navbar = () => {
const [show,setShow] = useState(false);

const showNavbar =()=>{
   setShow(!show)
}
let isLogin = useSelector(state =>state.isLogin)
     isLogin = isLogin || localStorage.getItem("userId")
 const dispatch =  useDispatch()
 const navigate = useNavigate()
  console.log(isLogin);

  //logout
   
  const handleLogout =()=>{
    try {
      dispatch(authActions.logout())
     
      navigate('/signin');
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
       
 
    
     
   
   
       
       {/* <div className='right_side md-my-0'>
        
          {isLogin?  <div className='links'>
          <Link to="/">MYBLOGS</Link>
             <Link to="/blogs">BLOGS</Link>
             <Link to="/createblogs">CREATE BLOGS</Link>
             <Link to="/logout" onClick={handleLogout}>LOGOUT</Link>
            
              </div>:<>
              <div className='link'>
              <Link to="/register">REGISTER</Link>
            <Link to="/signin">SIGNIN</Link>
           
              </div>
              </>} */}

            
         
          {isLogin? 
         
            <div className='navbar' >
          <h3 className='logo'>Blog World</h3>
            
             <ul className={show?'nav_links_mobile':'nav_links '} onClick={()=>setShow(false)}>

             <Link to="/blogs" className='blogs no-underline text-white'> <li>Blogs</li></Link>
              <Link to="/createblogs" className='createblogs no-underline text-white'><li >CreateBlogs</li></Link>
              <Link to="/" className='createblogs no-underline text-white'><li >MyBlogs</li></Link>
             <Link className='logout no-underline text-white' onClick={handleLogout}> <li>Logout</li></Link>
              
             </ul>
             <div className='mobile_menu_icon' onClick={()=>setShow(!show)}>
             {show?
             <FaTimes/>:
             <FaBars/>
             }
             </div>
            
             </div>
         :<> 
         <div className='navbar'>
         <h3 className='logo'>Blog World</h3>
              <ul className={show?'nav_links_mobile':'nav_links'}>
              <li><Link to="/register" className='no-underline text-xl text-white uppercase'>REGISTER</Link></li>
            <li><Link to="/signin" className='no-underline text-xl text-white uppercase'>SIGNIN</Link></li>
            </ul>
            <div className='mobile_menu_icon' onClick={()=>setShow(!show)}>
             {show?
             <FaTimes/>:
             <FaBars/>
             }
             </div>
             </div>
              </>}
        
              
          
            
     {/* <button className='nav-btn' onClick={showNavbar}><FaBars/></button> */}
    </>
  )
}


// const showPage = ()=>{
//   return(
//     <div id="dropdownDelay" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//     <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
//       <li>
//         <Link to="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link> </li>
//       <li>
//         <Link to="/blogs" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link> </li>
//       <li>
//         <Link to="/createblogs" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link></li>
//       <li>
//         <Link to="/logout"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link></li>
//     </ul>
// </div>
//   )
// }

export default Navbar
