import React from 'react'
import Checkout from './Checkout'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripepromise=loadStripe('pk_test_51QwewlFVUecUHs59JZ3LaEySHSrqEOR6l3uGM8qLjAD0EAIBj8i07p9UFUGsCRsQVbM6MGeVSNyAk7LSoanDLA1O00B824wYY7')

function Payment() {
  return (
    <div>
        <Elements stripe={stripepromise}>
        <Checkout/>
        </Elements>
        
        
      
    </div>
  )
}

export default Payment
