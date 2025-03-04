import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { regStud } from '../services/allApi'
import { toast } from 'react-toastify'

function Register() {

  const [reg,setReg]=useState({
    name:'',
    age:'',
    address:'',
    email:'',
    password:'',
    mobile:'',
    profile:''
  })

  const [validatename,setValidatename]=useState(true)
  const [validateage,setValidateage]=useState(true)
  const [validateaddress,setValidateaddress]=useState(true)
  const [valiudateemail,setValidateemail]=useState(true)
  const [validatemobile,setValidatemobile]=useState(true)

  const valid=(a)=>{
    const{name,value}=a.target

    if(name==='name'){
      if(!!value.match(/^[A-Z a-z]{1,}$/)){
        setReg({...reg,[name]:value})
        setValidatename(true)
      }
      else{
        setReg({...reg,[name]:value})
        setValidatename(false)
      }
    }

    else if(name==='age'){
      if(!!value.match(/^[0-9]{1,2}$/)){
        setReg({...reg,[name]:value})
        setValidateage(true)
      }
      else{
        setReg({...reg,[name]:value})
        setValidateage(false)
      }
    }
    else if(name==='address'){
      if(!!value.match(/^[a-z A-Z0-9,]{1,}$/)){
        setReg({...reg,[name]:value})
        setValidateaddress(true)
      }
      else{
        setReg({...reg,[name]:value})
        setValidateaddress(false)
      }
    }

    else if(name==='email'){
      if(!!value.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{3,}$/)){
        setReg({...reg,[name]:value})
        setValidateemail(true)
      }
      else{
        setReg({...reg,[name]:value})
        setValidateemail(false)
      }
    }

    else if (name==='mobile'){
      if(!!value.match(/^[0-9]{1,10}$/)){
        setReg({...reg,[name]:value})
        setValidatemobile(true)
      }
      else{
        setReg({...reg,[name]:value})
        setValidatemobile(false)
      }
    }

    console.log(reg)
    
  }

  const register=async(e)=>{
    e.preventDefault()
    const {name,age,address,email,password,mobile,profile}=reg

    if(!name || !age || !address || !email || !password || !mobile || !profile){
      toast.warning('enter all values')
    }
    else{
      const data=new FormData()
      data.append('name',reg.name)
      data.append('age',reg.age)
      data.append('address',reg.address)
      data.append('email',reg.email)
      data.append('password',reg.password)
      data.append('mobile',reg.mobile)
      data.append('profile',reg.profile)


      const header={
        'Content-Type':'multipart/form-data'
      }

      const result =await regStud(data,header)
      console.log(result)

      if(result.status===200){
        toast.success('registration suucessful')
        setReg({
          name:'',
          age:'',
          address:'',
          email:'',
          password:'',
          mobile:'',
          profile:''
        })
      }
      else{
        toast.error('registration failed')
      }
    }
  }


  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'650px'}}>
        <form action="" className='card container' style={{width:'300px',height:'580px'}}>
            <h2 className='text-center'>Register</h2>
            Name: <input type="text" name='name' value={reg.name} className='form-control' onChange={(a)=>valid(a)} />
            {
              !validatename &&
              <div className='text-danger'>invalid value</div>
            }
            Age: <input type="age" name='age' value={reg.age} className='form-control' onChange={(a)=>valid(a)} />
            {
              !validateage &&
              <div className='text-danger'>invalid value</div>
            }
            Address: <input type="address" name='address' value={reg.address} className='form-control' onChange={(a)=>valid(a)}/>
            {
              !validateaddress &&
              <div className='text-danger'>invalid value</div>
            }
            Email: <input type="email" name='email' value={reg.email} className='form-control' onChange={(a)=>valid(a)}/>
            {
              !valiudateemail &&
              <div className='text-danger'>invalid value</div>
            }
            Password: <input type="password" name='password' value={reg.password} className='form-control' onChange={(a)=>setReg({...reg,password:a.target.value})} />
            Mobile: <input type="tel" name='mobile' value={reg.mobile} className='form-control' onChange={(a)=>valid(a)}/>
            {
              !validatemobile &&
              <div className='text-danger'>invalid value</div>
            }
            Profile: <input type="file" name='profile' required  className='form-control' onChange={(a)=>setReg({...reg,profile:a.target.files[0]})} />
            <button className='btn btn-success mt-3' onClick={register}>Register</button>
            <Link to='/login'><a href="">Already a user? sign in</a></Link>
        </form>
      
    </div>
  )
}

export default Register
