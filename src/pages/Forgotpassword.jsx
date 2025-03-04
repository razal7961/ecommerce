import React, { useState } from 'react'
import { forgotpassword } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Forgotpassword() {

  const [password,setPassword]=useState()
  const navigate=useNavigate()

  const submit=async(e)=>{
    e.preventDefault()

    if(!password.email){
      toast.warning('enter email')
    }

    else{
      const result=await forgotpassword(password)
      console.log(result)
      if(result.status===200){
        toast.success('valid email')
        const id=sessionStorage.setItem('id',result.data._id)
        navigate('/change')
      }
      else{
        toast.error('invalid email')
      }
    }
  }


  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'600px'}}>
        <div className='card container' style={{height:'200px',width:'300px'}}>
            <h3 className='text-center'>Forgot password</h3>
            <input type="email" name='email' className='form-control' placeholder='enter email' onChange={(a)=>setPassword({...password,email:a.target.value})}/>
            <button className='btn btn-primary mt-3 form-control' onClick={(e)=>submit(e)}>Submit</button>
        </div>
      
    </div>
  )
}

export default Forgotpassword
