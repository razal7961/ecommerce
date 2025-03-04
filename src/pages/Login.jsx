import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logstud } from '../services/allApi'
import { toast } from 'react-toastify'

function Login() {

  const [login,setLogin]=useState()
  const navigate=useNavigate()

  console.log(login)

  const log=async(e)=>{
    e.preventDefault()
    const {email,password}=login
    if(!email || !password){
      toast .warning('enter all values')
    }
    else{
      const result=await logstud(login)
      console.log(result)

      if(result.status==200 && result.data.role==='admin'){
        const id=sessionStorage.setItem('userid',result.data.result._id)
        const token=sessionStorage.setItem('token',result.data.token)
        const role=sessionStorage.setItem('role',result.data.role)
        toast.success('login successful')
        navigate('/admin')
      }
      else if(result.status==200 && result.data.role==='user'){
        const id=sessionStorage.setItem('userid',result.data.result._id)
        const token=sessionStorage.setItem('token',result.data.token)
        const role=sessionStorage.setItem('role',result.data.role)
        toast.success('login successful')
        navigate('/home2')
      }
      else{
        toast.warning('login failed')
      }
    }
  }


  return (
    <div className='d-flex justify-content-center align-items-center container' style={{height:'500px'}}>
        <div className='card d-flex justify-content-center align-items-center container' style={{height:'300px',width:'300px'}}>
            <h3 className='text-center'>Login</h3>
            <input type="email" name='email' className='form-control' placeholder='enter email' onChange={(a)=>setLogin({...login,email:a.target.value})} />
             <input type="password" name='password' className='form-control mt-3' placeholder='enter password' onChange={(a)=>setLogin({...login,password:a.target.value})} />
            <Link to='/forgotpassword'><a href="">forgot password?</a></Link>
            <button className='btn btn-success form-control mt-3' onClick={(e)=>log(e)}>Login</button>
            <Link to='/register'><a href="">New user? Sign up</a></Link>
        </div>
      
    </div>
  )
}

export default Login
