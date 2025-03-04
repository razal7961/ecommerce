import React, { useEffect, useState } from 'react'
import Adminnav from './Adminnav'
import { viewusers } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'

function Viewusers() {

  const [view,setView]=useState()

  const get=async()=>{
    const result=await viewusers()
    console.log(result.data)
    setView(result.data)
  }
  console.log(view)

  useEffect(()=>{
    get()
  },[])


  return (
    <div style={{height:'600px'}}>
        <div><Adminnav/></div>
        <div className='mt-3 overflow-x-scroll'>
          <table className='table table-bordered text-center'>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>UserId</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {
                view?.map(item=>(
                  <tr>
                    <td><img src={`${BASE_URL}/upload/${item.profile}`} style={{height:'100px',width:'100px'}} alt="" /></td>
                    <td>{item.name}</td>
                    <td>{item._id}</td>
                    <td>{item.email}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>{item.mobile}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Viewusers
