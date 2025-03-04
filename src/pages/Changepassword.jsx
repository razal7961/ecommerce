import React, { useState } from 'react'
import { changepassword } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Changepassword() {

  const [newpassword,setNewpassword]=useState()
  console.log(newpassword)

  const navigate=useNavigate()

  const update=async(e)=>{
    e.preventDefault()

    const {password,confirmpassword}=newpassword

    if(password===confirmpassword){
     const id= sessionStorage.getItem('id')
     console.log(id)
     console.log(password)

     const result=await changepassword(id,{password})
     console.log(result)
     if(result.status==200){
      sessionStorage.clear()
      toast.success('password updated')
     }
     else{
      toast.warning('updation failed')
     }
    }
  }

  


  return (
    <div  className='d-flex justify-content-center align-items-center ' style={{ height: '400px' }}>
      <div className='card container' style={{width:'300px',height:'200px'}}>
         <form action="">
            <h4 className='text-center'>Change password</h4>
            <input type="password" name='password' className='form-control' placeholder='new password'  onChange={(a)=>setNewpassword({...newpassword,password:a.target.value})}/>
            <input type="password" name='confirmpassword' className='form-control mt-2' placeholder='confirm password'  onChange={(a)=>setNewpassword({...newpassword,confirmpassword:a.target.value})} />
            <button className='btn btn-success form-control mt-3'  onClick={(e)=>update(e)}>Update</button>
        </form>
        </div>
      
    </div>
  )
}

export default Changepassword
