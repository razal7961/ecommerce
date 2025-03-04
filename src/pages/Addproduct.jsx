import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import Adminnav from './Adminnav'
import { addproduct } from '../services/allApi'
import { toast } from 'react-toastify'

function Addproduct() {

  const [product, setProduct] = useState({
    image: '',
    title: '',
    description: '',
    category: '',
    quantity: '',
    userid: sessionStorage.getItem('userid'),
    price: ''
  })
  const [item, setItem] = useState({
    image: '',
    title: '',
    description: '',
    category: '',
    quantity: '',
    userid: '',
    price: ''
  })
  console.log(product)

  const [preview, setPreview] = useState()

  const [token, setToken] = useState()

  const [validatetitle, setValidatetitle] = useState(true)
  const [validatedescription, setValidatedescription] = useState(true)
  const [validatecategory, setValidatecategory] = useState(true)
  const [validatequantity, setValidatequantity] = useState(true)
  const [validateprice, setValidateprice] = useState(true)

  const valid = (a) => {
    const { name, value } = a.target

    if (name === 'title') {
      if (!!value.match(/^[A-Z a-z0-9]{1,}$/)) {
        setProduct({ ...product, [name]: value })
        setValidatetitle(true)
      }
      else {
        setProduct({ ...product, [name]: value })
        setValidatetitle(false)
      }
    }
    else if (name === 'description') {
      if (!!value.match(/^[A-Z a-z-]{1,}$/)) {
        setProduct({ ...product, [name]: value })
        setValidatedescription(true)
      }
      else {
        setProduct({ ...product, [name]: value })
        setValidatedescription(false)
      }
    }
    else if (name === 'category') {
      if (!!value.match(/^[A-Z a-z]{1,}$/)) {
        setProduct({ ...product, [name]: value })
        setValidatecategory(true)
      }
      else {
        setProduct({ ...product, [name]: value })
        setValidatecategory(false)
      }
    }
    else if (name === 'quantity') {
      if (!!value.match(/^[0-9]{1,}$/)) {
        setProduct({ ...product, [name]: value })
        setValidatequantity(true)
      }
      else {
        setProduct({ ...product, [name]: value })
        setValidatequantity(false)
      }
    }
    else if (name === 'price') {
      if (!!value.match(/^[0-9]{1,}$/)) {
        setProduct({ ...product, [name]: value })
        setValidateprice(true)
      }
      else {
        setProduct({ ...product, [name]: value })
        setValidateprice(false)
      }
    }
  }

  const add = async (e) => {
    e.preventDefault()
    const { image, title, description, category, quantity, userid, price } = product
    if (!image || !title || !description || !category || !quantity || !userid || !price) {
      toast.warning('enter all values')
    }

    else {
      const newproduct = new FormData()
      newproduct.append('image', product.image)
      newproduct.append('title', product.title)
      newproduct.append('description', product.description)
      newproduct.append('category', product.category)
      newproduct.append('quantity', product.quantity)
      newproduct.append('userid', product.userid)
      newproduct.append('price', product.price)

      const header = {
        "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`
      }

      const result = await addproduct(newproduct, header)
      console.log(result)

      if (result.status === 200) {
        toast.success('new product is added')
        setProduct({
          image: '',
          title: '',
          description: '',
          category: '',
          quantity: '',
          userid: sessionStorage.getItem('userid'),
          price: ''
        })
      }
      else {
        toast.error('addproduct is failed')
      }
    }
  }

  useEffect(() => {
    if (product.image != item.image) {
      setPreview(URL.createObjectURL(product.image))
    }
  }, [product.image])

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    setProduct({ ...product, userid: sessionStorage.getItem('userid') })
  },[])


  return (
    <div style={{ height: '800px' }}>
      <div><Adminnav /></div>

      <div className='d-flex justify-content-center align-items-center mt-4'>
        <form action="" className='card container ' style={{ width: '300px', height: '700px' }}>
          <label htmlFor="image">
            <input type="file" name='image' id='image' onChange={(a) => setProduct({ ...product, image: a.target.files[0] })} style={{ display: 'none' }} />
            <img src={preview ? preview : "https://ts1.mm.bing.net/th?id=OIP.2uJD_tsDBicbcwz4RJV0mAHaHa&pid=15.1"} alt="" className='m-4' style={{ width: '200px', height: '200px' }} />
          </label>
          Title: <input type="text" name='title' className='form-control' onChange={(a) => valid(a)} />
          {
            !validatetitle &&
            <div className='text-danger'>invalid value</div>
          }
          Description: <input type="text" name='description' className='form-control' onChange={(a) => valid(a)} />
          {
            !validatedescription &&
            <div className='text-danger'>invalid value</div>
          }
          Category: <input type="text" name='category' className='form-control' onChange={(a) => valid(a)} />
          {
            !validatecategory &&
            <div className='text-danger'>invalid value</div>
          }
          Quantity: <input type="number" name='quantity' className='form-control' onChange={(a) => valid(a)} />
          {
            !validatequantity &&
            <div className='text-danger'>invalid value</div>
          }
          Userid: <input type="id" name='userid' defaultValue={product.userid} className='form-control' />
          Price: <input type="number" name='price' className='form-control' onChange={(a) => valid(a)} />
          {
            !validateprice &&
            <div className='text-danger'>invalid value</div>
          }
          <button className='btn btn-success form-control mt-3' onClick={(e) => add(e)}>Add</button>
        </form>
      </div>



    </div>
  )
}

export default Addproduct
