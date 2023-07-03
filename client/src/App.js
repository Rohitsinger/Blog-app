import React, { useEffect } from 'react'
import './App.css';
import {  useNavigate } from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './component/Register';
import MyBlogs from './component/MyBlogs';
import Signin from './component/Signin';
import Navbar from './component/Navbar';
import Blogs from './component/Blogs';
import CreateBlogs from './component/CreateBlogs';
import Logout from './component/Logout';
import BlogDetails from './component/BlogDetails';
import Read from './component/Read';
// import Home from './Home';
// import Post from './Post';
// import Cart from './components/Cart';
// import Navbar from './components/Navbar';


const Routing =()=>{
  
  return (
    <Routes>
         
    <Route exact path="/" element={<MyBlogs/>} />
    <Route  path="/blogs" element={<Blogs/>} />
    <Route  path="/:id" element={<BlogDetails/>} />
    <Route  path="/createblogs" element={<CreateBlogs/>} />
    <Route  path="/register" element={<Register/>} />
    <Route  path="/signin" element={<Signin/>} />
    <Route  path="/read" element={<Read/>} />
    <Route  path="/logout" element={<Logout/>} />
</Routes>
  )
}

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
        </BrowserRouter>
   
    </div>
  );
}

export default App;
