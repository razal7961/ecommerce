import React, { useEffect, useState } from 'react'
import { viewwishlist } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'
import { removeitem } from '../services/allApi'
import { addtocart } from '../services/allApi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Wishlist() {

  const [wishlist, setWishlist] = useState()
  const [cart, setCart] = useState({
    productid: '',
    title: '',
    category: '',
    price: '',
    quantity: '',
    userid: sessionStorage.getItem('userid'),
    total: '',
    image: ''
  })

  const wish = async () => {
    const id = sessionStorage.getItem('userid')
    const result = await viewwishlist(id)
    console.log(result.data)
    setWishlist(result.data)
  }

  const addcart = async (item) => {
    console.log(item)

    const product = {
      productid: item.productid,
      title: item.title,
      category: item.category,
      price: item.price,
      quantity: '1',
      userid: cart.userid,
      total: '',
      image: item.image
    }

    console.log(product)

    const result = await addtocart(product)
    console.log(result)
    if (result.status === 200) {
      toast.success('product added to cart')
    }
    else {
      toast.warning('already added product')
    }
  }


  const remove = async (id) => {
    const result = await removeitem(id)
    console.log(result)
    if (result.status === 200) {
      wish()
    }
    else {
      toast.error('item not removed')
    }
  }

  useEffect(() => {
    // const id=sessionStorage.getItem('userid')
    wish()
  }, [])


  return (

    <div style={{minHeight:'600px'}}>

      {

      wishlist?.length>0?

    <div className='row'>
      {
        wishlist?.map(item => (
          <div className='col-lg-3 ' >
            <div className='card shadow' style={{ height: '400px', width: '260px' }}>
              <img src={`${BASE_URL}/upload/${item.image}`} style={{ height: '200px' }} alt="" />
              <h3>{item.title}</h3>
              <p>{item.description},{item.category}</p>
              <strong>{item.price}</strong>
              <div className='d-flex justify-content-center container'>
                {
                  item.quantity > 0 ?
                    <button className='btn btn-info  form-control' style={{ height: '50px' }} onClick={() => { addcart(item) }}><i className="fa-solid fa-cart-shopping fa-xl"></i></button> :
                    <button className='btn btn-warning text-center' style={{ height: '50px' }}> Out of stock</button>

                }
                <button className='btn btn-warning form-control ms-2' style={{ height: '50px' }} onClick={() => { remove(item._id) }}><i class="fa-solid fa-heart-circle-xmark fa-xl"></i></button>
              </div>
            </div>
          </div>
        ))
      }
      
    </div>
    :
    <div>
      <h1>No items in wishlist...<Link to={'/home2'}>Click to select product</Link></h1>
    </div>
    
}

    </div>



  )
}

export default Wishlist
