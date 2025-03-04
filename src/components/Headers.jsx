import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Headers() {

    const navigate=useNavigate()

    const logout=async()=>{
        sessionStorage.clear()
        navigate('/login')
    }


  return (
    <div>
       <div style={{height:'60px'}} className='d-flex justify-content-evenly mt-2 mb-3 shadow'>
        <img src="https://th.bing.com/th/id/OIP.cjKjh8fzmx1-zzOP_lZNdgAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7" style={{height:'50px',width:'100px'}} alt=""  />
        
      {
        sessionStorage.getItem("userid") ?
        <>
        <button className='btn btn-danger' style={{height:'50px'}} onClick={logout}>Logout</button>
        <Link to='/usereditprofile'><button className='btn' style={{height:'50px'}}><i class="fa-solid fa-user fa-xl"></i></button></Link>
        </>
        
        
        :
        <Link to='/login'><button className='btn btn-primary ' style={{height:'50px'}}>Login</button></Link> 
      }
        <Link to='/viewcart'><button className='btn mb-4' style={{height:'50px'}}><i className="fa-solid fa-cart-shopping fa-xl"></i></button></Link>
        <Link to='/wishlist'><button className='btn' style={{height:'50px'}}><i class="fa-solid fa-heart fa-xl"></i></button></Link>
        

        
       </div>
       
    </div>
  )
}

export default Headers
