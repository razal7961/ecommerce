import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/baseurl'
import { Category } from '../services/allApi'

function Men() {

    const [men, setMen] = useState()

    const get = async () => {
        const category = 'men'

        const result = await Category(category)
        console.log(result.data)
        setMen(result.data)

    }
    console.log(men)

    useEffect(() => {
        get()
    }, [])


    return (
        <div>
            <div className='d-flex justify-content-evenly'>
                <div className=''>


                    <Link to='/'><button className='btn'><i class="fa-solid fa-house fa-xl"></i></button></Link>

                    <Link to='/men'> <button className='btn'><h4>Men</h4></button></Link>

                    <Link to='/women'><button className='btn'><h4>Women</h4></button></Link>

                    <Link to='/kids'><button className='btn'><h4>Kids</h4></button></Link>


                </div>

            </div>

            <div className='mt-5 row'>
                {
                    men?.map(item => (
                        <div className='col-lg-3'>
                            <div className='card mt-2 shadow' style={{ height: '350px', width: '260px' }}>
                                <img src={`${BASE_URL}/upload/${item.image}`} alt="" style={{ height: '200px' }} />
                                <h3>{item.title}</h3>
                                <strong>{item.price}</strong>
                                <div className='d-flex justify-content-center container'>
                                    <button className='btn btn-info  form-control' style={{ height: '50px' }}><i className="fa-solid fa-cart-shopping fa-xl"></i></button>
                                    <button className='btn btn-success form-control ms-2' style={{ height: '50px' }}><i class="fa-solid fa-heart fa-xl"></i></button>
                                </div>

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Men
