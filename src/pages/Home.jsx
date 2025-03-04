import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { showproduct } from '../services/allApi'
import { BASE_URL } from '../services/baseurl'
import { Link } from 'react-router-dom'

function Home() {

    const [show,setShow]=useState()

    const view=async()=>{
        const result=await showproduct()
        console.log(result.data)
        setShow(result.data)
    }

    useEffect(()=>{
        view()
    },[])


  return (
    <div style={{}} className='container'>
        <Link to='/home2'><Carousel>
            <CarouselItem>
                <img src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/tophero/PC/Winter_Store._CB542298117_.jpg" alt="" />
            </CarouselItem>
            <CarouselItem>
                <img src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/tophero/PC/Coupons._CB542298117_.jpg" alt="" />
            </CarouselItem>
            <CarouselItem>
                <img src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/tophero/PC/Clearance_Store._CB542298117_.jpg" alt="" />
            </CarouselItem>
        </Carousel></Link>

        <div className='row mt-5'>
           <h3>Top Sales</h3>
          {
            show?.map(item=>(
                <div className='col-lg-3 ' >
            <div className='card' style={{height:'360px',width:'260px'}}>
            <img src={`${BASE_URL}/upload/${item.image}`} className='' style={{height:'300px'}} alt="" />
            <h5>{item.title}</h5>
            <strong>{item.price}</strong>
           </div>
           </div> 
            ))
          }
        </div>

       
      
    </div>
  )
}

export default Home
