import React from 'react'

const Table = ({data}) => {
  return (
    <table className='table'>
      <tbody className='tb'>
        <tr className='tr'>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
        </tr>
        {
            data.map((item)=>{
                return(
                    <tr className='tr'>
            <th>{item.firstName}</th>
            <th>{item.lastName}</th>
            <th>{item.email}</th>
        </tr>
                )
            })
        }
       
      </tbody>
    </table>
  )
}

export default Table
