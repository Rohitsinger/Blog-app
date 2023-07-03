import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../Context' 
import './New.css'

const Cart = () => {
  const GlobalState = useContext(ProductContext)
   const state = GlobalState.state
    const dispatch = GlobalState.dispatch
    const total = state.reduce((total,item)=>{
      return total+item.price*item.quantity
    },0)
  return (
    state && 
    <div className='cart'>
       {
        state.map((item,index)=>{
            return(
              <div className='card' key={index}>
                 <img src={item.thumbnail} alt={item.title}/>
                 <p>{item.title}</p>
                
                 <button onClick={()=>dispatch({type:'INCREASE',payload:item})} >+</button>
                 <p>{item.quantity}</p>
                 <button onClick={()=>{
                  if(item.quantity>1){
                    dispatch({type:'DECREASE',payload:item})
                  } else{
                    dispatch({type:'REMOVE',payload:item})
                  }
                 }}>-</button>

                 
                 <p>${item.quantity * item.price}</p>
                 
                 <button onClick={()=>dispatch({type:'REMOVE',payload:item})}>x</button>

                 {
                  state.length>0 && 
                  <div><h2>$.{total}</h2></div>
                 }
              </div>
            )
        })
       }
    </div>
  )
}

export default Cart

