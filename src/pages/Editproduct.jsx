import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { editproduct, viewproduct } from '../services/allApi'
import Viewproduct from './Viewproduct'
import { BASE_URL } from '../services/baseurl'
import { toast } from 'react-toastify'

function Editproduct({data}) {

    const [show,setShow]=useState(false)

    const [edit,setEdit]=useState({
        image:data.image,
        title:data.title,
        description:data.description,
        category:data.category,
        quantity:data.quantity,
        userid:data._id,
        price:data.price
    })

    const [item,setItem]=useState({
        image:data.image,
        title:data.title,
        description:data.description,
        category:data.category,
        quantity:data.quantity,
        userid:data._id,
        price:data.price
    })

    const [preview,setPreview]=useState("")
    const [token,setToken]=useState("")

    const getproduct=async(id)=>{
       console.log(id)
       const result =await viewproduct(id)
       console.log(result)
    }

    const update=async()=>{
        const product=new FormData()

        product.append('image',edit.image)
        product.append('title',edit.title)
        product.append('description',edit.description)
        product.append('category',edit.category)
        product.append('quantity',edit.quantity)
        product.append('userid',edit.userid)
        product.append('price',edit.price)

        if(!edit.image){
            const header={
                'Content-Type': 'application/json','authorization': `Bearer ${token}`
            }

            const result=await editproduct(item.userid,product,header)
            console.log(result)

            if(result.status===200){
                toast.success('product updated')
                getproduct()
            }
            else{
                toast.error('updation failed')
            }
        }
        else{
            const headers={
                'Content-Type':'multipart/form-data','authorization':`Bearer ${token}`
            }

            const result=await editproduct(item.userid,product,headers)
            console.log(result)

            if(result.status===200){
                toast.success('product is updated')
            }
            else{
                toast.error('updation failed')
            }
        }
    }

    const handleclose=()=>setShow(false)
    const handleshow=()=>setShow(true)

useEffect(()=>{
    if(edit.image != item.image){
        setPreview(URL.createObjectURL(edit.image))
    }
},[edit.image])

useEffect(()=>{
    setToken(sessionStorage.getItem('token'))
    setEdit({...edit,userid:sessionStorage.getItem('userid')})
},[])

  return (
    <div>

        <Button className='btn btn-primary form-control ' onClick={handleshow}>Edit</Button>
      <Modal show={show} onHide={handleclose}>
        <Modal.Header>
            <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <ModalBody>
            <div className='d-flex justify-content-center align-items-center mt-4'>
                <form action="" className='card container' style={{ width: '300px', height: '600px' }}>
                    <label htmlFor="image">
                        <input type="file" name='image' id='image' style={{display:'none'}} onChange={(a)=>setEdit({...edit,image:a.target.files[0]})} />
                        <img src={preview ? preview: `${BASE_URL}/upload/${item.image}`} style={{width: '200px', height: '200px'}} alt="" className='m-4'/>
                    </label>

                    Title:<input type="text"  className='form-control' defaultValue={edit.title} onChange={(a)=>setEdit({...edit,title:a.target.value})}/>
                    Description:<input type="text"  className='form-control ' defaultValue={edit.description}  onChange={(a)=>setEdit({...edit,description:a.target.value})}/>
                    Category:<input type="text"  className='form-control ' defaultValue={edit.category}  onChange={(a)=>setEdit({...edit,category:a.target.value})}/>
                    Quantity:<input type="number"  className='form-control ' defaultValue={edit.quantity}  onChange={(a)=>setEdit({...edit,quantity:a.target.value})}/>
                    Price:<input type="number"  className='form-control' defaultValue={edit.price}  onChange={(a)=>setEdit({...edit,price:a.target.value})}/>
                </form>

            </div>
        </ModalBody>

        <ModalFooter>
            <Button onClick={handleclose} variant='warning'>Close</Button>
            <Button variant='info' onClick={update}>Update</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Editproduct
