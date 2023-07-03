import axios from 'axios'
import React,{useEffect, useState} from 'react'
// import {Button, Form} from 'react-bootstrap'
// import {  useNavigate } from 'react-router-dom'
// import Modal from 'react-bootstrap/Modal';
import { Users } from './components/Fetch'
import Table from './components/Table'
import './Post.css'

const Post = () => {
const [require,setRequire] = useState("")


const keys = ["firstName","lastName", "email"]




const search = (data)=>{
  return data.filter((users)=>keys.some(key=>users[key].toLowerCase().includes(require)))
}

  return (
    <div>
      <input placeholder='Search...' className='search' onChange={(e)=>setRequire(e.target.value)}/>
      <Table data={search(Users)}/>
      {/* <ul className='list'>
        {Users.filter(user=>user.firstName.toLowerCase().includes(data)).map((users)=>{
          return(
            <li key={Users.id} className='list_item'> {users.firstName}</li>
          )
        })}
      </ul> */}
      
    </div>
  )
}

export default Post



