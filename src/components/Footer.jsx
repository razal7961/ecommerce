import React from 'react'

function Footer() {
  return (
    <div>
      <div style={{height:'300px'}} className='bg-dark d-flex justify-content-evenly align-items-center text-white mt-3'>
        <img src="https://th.bing.com/th/id/OIP.cjKjh8fzmx1-zzOP_lZNdgAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7" style={{width:'100px',height:'100px'}} alt="" />
        <div className='row mt-5' >
            <div className='col-2 ' >
                <h6 className='text-secondary'>ABOUT</h6>
                <p>contact about careers stories</p>
            </div>
            <div className='col-2 ms-3' >
                <h6 className='text-secondary'>COMPANIES</h6>
                <p>amazon myntra ajio</p>
            </div>
            <div className='col-2 ms-5'>
                <h6 className='text-secondary'>HELP</h6>
                <p>shipping payment cancelltion</p>
            </div>
            
        </div>

      </div>
    </div>
  )
}

export default Footer
