import React, { useEffect, useState } from 'react'
import { userprofile } from '../services/allApi'
import { getuser } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'
import { toast } from 'react-toastify'

function Usereditprofile() {

    const [edit,setEdit]=useState({
        name:'',
        age:'',
        address:'',
        email:'',
        password:'',
        mobile:'',
        profile:'',
        _id:''
    })

    const [data,setData]=useState({
        name:'',
        age:'',
        address:'',
        email:'',
        password:'',
        mobile:'',
        profile:''
    })

    const [preview,setPreview]=useState()

    const get=async(id)=>{
        const result=await getuser(id)
        console.log(result)

        setEdit(result.data)
        setData(result.data)
    }

    const update = async (e) => {
        e.preventDefault();
        console.log(edit);
    
        const data = new FormData();
        data.append('name', edit.name);
        data.append('age', edit.age);
        data.append('address', edit.address);
        data.append('email', edit.email);
        data.append('password', edit.password);
        data.append('mobile', edit.mobile);
    
        // Append profile only if it's a new file (not a string URL)
        if (typeof edit.profile !== 'string') {
          data.append('profile', edit.profile);
        }
    
        const headers = {
          'Content-Type': edit.profile instanceof File ? 'multipart/form-data' : 'application/json',
        };
    
        const result = await userprofile(edit._id, data, headers);
        console.log(result);
    
        if (result.status === 200) {
          toast.success('Profile updated');
          get(result.data._id)
          // setEdit(result.data);
          // setItem(result.data);
    
        } else {
          toast.error('Update failed');
        }
      };
    
      useEffect(() => {
        if (edit.profile && typeof edit.profile !== 'string') {
          setPreview(URL.createObjectURL(edit.profile));
        } else {
          setPreview('');
        }
      }, [edit.profile]);
    
    useEffect(()=>{
        const id=sessionStorage.getItem('userid')
        get(id)
    },[])



  return (
    <div>
      <div className='d-flex justify-content-center align-items-center mt-4'>
        <form action="" className='card container' style={{width:'300px',height:'700px'}}>
            <label htmlFor="profile">
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          onChange={(e) => setEdit({ ...edit, profile: e.target.files[0] })}
                          style={{ display: 'none' }}
                        />
                        <img
                          src={preview ? preview : `${BASE_URL}/upload/${edit.profile}`}
                          alt="Profile"
                          style={{ width: '200px', height: '200px' }}
                          className="m-4"
                        />
                      </label>

            Name: <input type="text" className='form-control'defaultValue={edit.name} onChange={(a)=>setEdit({...edit,name:a.target.value})}/>
            Age: <input type="number" className='form-control' defaultValue={edit.age} onChange={(a)=>setEdit({...edit,age:a.target.value})}/>
            Address: <input type="address" className='form-control' defaultValue={edit.address} onChange={(a)=>setEdit({...edit,address:a.target.value})}/>
            Email: <input type="email" className='form-control' defaultValue={edit.email} onChange={(a)=>setEdit({...edit,email:a.target.value})}/>
            Password: <input type="password" className='form-control' defaultValue={edit.password} onChange={(a)=>setEdit({...edit,password:a.target.value})}/>
            Mobile: <input type="tel" className='form-control' defaultValue={edit.mobile} onChange={(a)=>setEdit({...edit,mobile:a.target.value})}/>
            <button className='btn btn-success mt-3' onClick={(e)=>update(e)}>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Usereditprofile
