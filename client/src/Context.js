import { createContext, useReducer } from "react";
import { useState } from "react";
// import { initialState } from "./shopReducer";

export const ProductContext = createContext()

export const Context = ({children})=>{

   // const [add,setAdd] = useState([])
   // const info = { add,setAdd}

   const reducer =(state,action)=>{
     switch (action.type) {
      case 'ADD':
         const temperaryState = state.filter((item)=>action.payload.id===item.id)

         if(temperaryState.length>0){
            return state;
         }
         else{
            return [...state,action.payload]
         }
        case 'INCREASE':
         const temperaryState1 = state.map((item)=>{
            
            if(item.id===action.payload.id){
              return {...item,quantity:item.quantity + 1}
            }else{
              return item;
            }
         })
            return temperaryState1;
        case 'DECREASE':
         const temperaryState2 = state.map((item)=>{
            
            if(item.id===action.payload.id){
              return {...item,quantity:item.quantity - 1}
            }else{
              return item;
            }
         })
            return temperaryState2;
      case 'REMOVE' :
         const temperaryState3 = state.filter((item)=>item.id!==action.payload.id)
         return temperaryState3
      default:
         return state;
     }
   }

   const [state,dispatch] = useReducer(reducer,[])
   const  info = {state,dispatch}
  return <ProductContext.Provider value={info}>{children}</ProductContext.Provider>
}



























// export const ProductContext = createContext()

// export const Context = ({children})=>{

//     const reducer =(state,action)=>{
//        switch (action.type) {
//         case "ADD":
//             return [...state,action.payload]
        
       
//          default:
//            return state;
//        }
//     }

//    const [state,dispatch] = useReducer(reducer,[])

//    const info={state,dispatch};
   
//   return<ProductContext.Provider value={info}>
//           {children}
//   </ProductContext.Provider>
// }


