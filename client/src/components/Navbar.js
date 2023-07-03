import React from 'react'
import { Link } from 'react-router-dom'
import './New.css'

const Navbar = () => {
  return (
    <div className='carts'>
    <Link to='/'>Home</Link>
      <Link to='/cart'>Cart</Link>
    </div>
  )
}

export default Navbar


{/* <BrowserRouter>
<Navbar/>
<Routes>
   <Route  path="/" element={<Home/>} />
   <Route  path="/cart" element={<Cart/>} />

 </Routes>
</BrowserRouter> */}