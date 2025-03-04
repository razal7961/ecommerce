import React, { useEffect, useState } from 'react'
import { cartdelete } from '../services/allApi'
import { useNavigate } from 'react-router-dom'

function Success() {

  const [details,setdetails]=useState({})
  console.log(details)

  const navigate=useNavigate()

  const cart=async()=>{
    const id=sessionStorage.getItem('userid')
    const result=await cartdelete(id)
    console.log(result)

    if(result.status===200){
      console.log('cart deleted')
      navigate('/home2')
    }
    else{
      console.log('cart not deleted')
    }
  }

  useEffect(()=>{
    const payment=JSON.parse(sessionStorage.getItem('details'))
    console.log(payment)
    setdetails(payment)
  },[])


  return (
    <div style={{height:'600px'}}>
        <div className='d-flex justify-content-center align-items-center mt-4 ' >
            <div className=' d-flex justify-content-center align-items-center card' style={{width:'400px',height:'500px'}}>

        <div >
            <img src="https://th.bing.com/th?id=OIP.uujMBPlSnSaA6lGrGj3mXgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" style={{width:'200px',height:'200px'}}/>
        </div>
        <div className='mt-3 container'>
            <h3>Payment ID: {details.id}</h3>
           <h3>Payment Status: {details.status}</h3>
           <h3>Payment Amount: {details.amount}</h3>
           <button className='btn btn-primary form-control' onClick={()=>{cart()}}>Home</button>
        </div>
      
    </div>
    </div>
    </div>
  )
}

export default Success
