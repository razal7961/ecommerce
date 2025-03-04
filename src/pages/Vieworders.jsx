import React, { useEffect, useState } from 'react'
import Adminnav from './Adminnav'
import { vieworder } from '../services/allApi'
import { toast } from 'react-toastify'

function Vieworders() {

  const [order,setOrder]=useState()
 

  const view=async()=>{
    const result=await vieworder()
    console.log(result.data)
    setOrder(result.data)
  }
  console.log(order)

  useEffect(()=>{
    view()
  },[])
  return (
    <div style={{height:'600px'}}>
        <div><Adminnav/></div>
        <div className='mt-3 overflow-x-scroll'>
          <table className='table table-bordered text-center'>
            <thead>
              <tr>
                <th>ID</th>
                <th>UserId</th>
                <th>PaymentId</th>
                <th>Paymentstatus</th>
                <th>Paymentamount</th>
              </tr>
            </thead>
            <tbody>
              {
                order?.map(item=>(
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.userid}</td>
                    <td>{item.paymentid}</td>
                    <td>{item.paymentstatus}</td>
                    <td>{item.paymentamount}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
       
      
    </div>
  )
}

export default Vieworders
