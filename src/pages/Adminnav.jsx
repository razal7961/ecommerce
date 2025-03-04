import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Adminnav() {

  const navigate=useNavigate()


  return (
    

      <div className='bg-dark d-flex justify-content-evenly align-items-center shadow' style={{ height: '50px' }}>
        <button className='btn text-light' onClick={() => navigate('/addproduct')}>Add Product</button>
        <button className='btn text-light' onClick={() => navigate('/viewproduct')}>View Product</button>
        <button className='btn text-light' onClick={() => navigate('/vieworders')}>View Orders</button>
        <button className='btn text-light' onClick={() => navigate('/viewusers')}>View Users</button>
        <button className='btn text-light' onClick={() => navigate('/editprofile')}>Edit Profile</button>
      </div>


    
  )
}

export default Adminnav
