import React, { useEffect, useState } from 'react'
import { viewcart } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'
import { increase } from '../services/allApi'
import { decrease } from '../services/allApi'
import { useMemo } from 'react'
import { deletecart } from '../services/allApi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Viewcart() {

    const [cart, setCart] = useState([])
    const [total,setTotal]=useState()

    const Cart = async () => {
        const id = sessionStorage.getItem('userid')
        const result = await viewcart(id)
        console.log(result.data)
        setCart(result.data)
    }

    const inc=async(id)=>{
        const result =await increase(id)
        if(result.status===200){
            Cart()
        }
        console.log(result)
    }

    const dec=async(id)=>{
        const result=await decrease(id)
        if(result.status===200){
            Cart()
        }
        console.log(result)
    }

    const del=async(id)=>{
        const result=await deletecart(id)
        console.log(result)
        if(result.status===200){
            Cart()
        }
        else{
            toast.warning('item not deleted')
        }
    }
    

    useEffect(() => {
        Cart()
    }, [])

    useMemo(()=>{
        const totalamount=cart?.reduce((sum,item)=>sum+item.total,0)
        const total=sessionStorage.setItem('totalamount',totalamount)
        console.log(totalamount)
        setTotal(totalamount || 0)
    },[cart])


    return (
        <div style={{minHeight:'600px'}}>
        {

        cart?.length>0?
        <div className='m-4' style={{ height: '600px' }}>
            <div className='row overflow-x-scroll'>
                <div className='col-7 '>
                    <table className='table border '>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Totalprice</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td><img src={`${BASE_URL}/upload/${item.image}`} style={{ height: '100px', width: '100px' }} alt="" /></td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td><button className='btn ' onClick={()=>{inc(item._id)}}> +</button>{item.quantity}<button className='btn' onClick={()=>{dec(item._id)}}>-</button></td>
                                        <td>{item.total}</td>
                                        <td><button className='btn' onClick={()=>{del(item._id)}}><i class="fa-solid fa-trash fa-xl"></i></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>



                </div>

                <div className='col-5  d-flex justify-content-center align-items-center card ' style={{ width: '400px', height: '300px' }}>

                            <div>
                                <h3>Total Products:{cart?.length}</h3>
                                <h3>Total Amount:{total}</h3>
                                <Link to='/payment'><button className='btn btn-danger mt-5'>Checkout</button></Link>
                            </div>

                      
                </div>
            </div>
        </div>

        :
        <div>
            <h1>No items in cart... <Link to={'/home2'}>Click to shop more</Link></h1>
        </div>
}
</div>
    )
}

export default Viewcart
