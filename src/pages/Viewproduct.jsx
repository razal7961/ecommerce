import React, { useEffect, useState } from 'react'
import Adminnav from './Adminnav'
import { viewproduct } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'
import { deleteproduct } from '../services/allApi'
import Editproduct from './Editproduct'
import { toast } from 'react-toastify'

function Viewproduct() {

  const [getproduct,setgetroduct]=useState()

  const view=async()=>{
    const result=await viewproduct()
    console.log(result.data)
    setgetroduct(result.data)
  }

  const del=async(id)=>{
    const result=await deleteproduct(id)
    console.log(result)
    if(result.status===200){
      view()
    }
    else{
      toast.warning('item not deleted')
    }
  }

  useEffect(()=>{
    view()
  },[])


  return (
    <div style={{height:''}}>
        <div><Adminnav/></div>
        
       <div className='row'>
        {
          getproduct?.map(item=>(
            <div className='col-lg-3'>
          <div className='card mt-3' style={{width:'200px',height:'460px'}}>
            <img src={`${BASE_URL}/upload/${item.image}`} alt="" style={{width:'200px',height:'200px'}} />
            <h3>{item.title}</h3>
            <p>{item.description},{item.category}
            <h5>{item.quantity}</h5>
            <h4>{item.price}</h4>
            </p>
            
            
            
           <div className='container d-flex justify-content-center'>
             <button className='btn btn-primary form-control '><Editproduct data={item}/></button>
            <button className='btn btn-danger ms-3 form-control'onClick={()=>{del(item._id)}}>Delete</button>
           </div>
          </div>
        </div>
          ))
        }
       </div>
      
    </div>
  )
}

export default Viewproduct
