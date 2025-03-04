import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { allproduct } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'
import { wishlist } from '../services/allApi'
import { addtocart } from '../services/allApi'
import { toast } from 'react-toastify'

function Home2() {

    const [product, setProduct] = useState()
    const [wish,setWish]=useState({
        productid:'',
        title:'',
        description:'',
        category:'',
        userid:sessionStorage.getItem('userid'),
        price:'',
        image:''
    })
    const [cart,setCart]=useState({
        productid:'',
        title:'',
        category:'',
        price:'',
        quantity:'',
        userid:sessionStorage.getItem('userid'),
        total:'',
        image:''
    })

    const [search,setSearch]=useState("")

    const view = async () => {
        const result = await allproduct(search)
        console.log(result.data)
        setProduct(result.data)
    }

    const addcart=async(item)=>{
        console.log(item)

        const product={
            productid:item._id,
            title:item.title,
            category:item.category,
            price:item.price,
            quantity:'1',
            userid:cart.userid,
            total:'',
            image:item.image
        }

        console.log(product)

        const result=await addtocart(product)
        console.log(result)
        if(result.status===200){
            toast.success('product added to cart')
        }
        else{
            toast.warning('already added product')
        }
    }

    const addwishlist=async(item)=>{
        console.log(item)

        const data={
            productid:item._id,
            title:item.title,
            description:item.description,
            category:item.category,
            userid:wish.userid,
            quantity:item.quantity,
            price:item.price,
            image:item.image
        }

        console.log(data)

        const result=await wishlist(data)
        console.log(result)
        if(result.status===200){
            toast.success('product added to wishlist')
        }
        else{
            toast.warning('already added product')
        }
    }
    

    useEffect(() => {
        view()
    }, [search])


    return (
        <div>
            <div className='d-flex justify-content-evenly'>
            <input type="text" className='form-control' placeholder='Search Products here' onChange={(a)=>setSearch(a.target.value)} style={{ width: '600px',height:'50px' }}  />

                
                    <div className=''>
                        
                            
                                <Link to='/'><button className='btn'><i class="fa-solid fa-house fa-xl"></i></button></Link>
                            
                               <Link to='/men'> <button className='btn'><h4>Men</h4></button></Link>
                            
                                <Link to='/women'><button className='btn'><h4>Women</h4></button></Link>
                            
                                <Link to='/kids'><button className='btn'><h4>Kids</h4></button></Link>
                            
                       
                    </div>

               
            </div>

            <div className='mt-5 row'>
                {
                    product?.map(item => (
                        <div className='col-lg-3'>
                            <div className='card mt-2 shadow' style={{ height: '350px', width: '260px' }}>
                                <img src={`${BASE_URL}/upload/${item.image}`} style={{ height: '200px' }} alt="" />
                                <h3>{item.title}</h3>
                                <strong>{item.price}</strong>
                                <div className='d-flex justify-content-center container'>
                                    {
                                        item.quantity>0 ?
                                        <button className='btn btn-info  form-control' style={{height:'50px'}} onClick={()=>{addcart(item)}}><i className="fa-solid fa-cart-shopping fa-xl"></i></button>:
                                        <button className='btn btn-warning'> Out of stock</button>

                                    }
                                <button className='btn btn-success form-control ms-2' style={{height:'50px'}} onClick={()=>{addwishlist(item)}}><i class="fa-solid fa-heart fa-xl"></i></button>
                                </div>
                            </div>
                            
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Home2
