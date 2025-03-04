import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements,CardElement,useStripe,useElements } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { addorder } from '../services/allApi'
import { toast } from 'react-toastify'

const stripepromise=loadStripe('pk_test_51QwewlFVUecUHs59JZ3LaEySHSrqEOR6l3uGM8qLjAD0EAIBj8i07p9UFUGsCRsQVbM6MGeVSNyAk7LSoanDLA1O00B824wYY7')

function Checkout() {

    const [amount,setAmount]=useState()
    const [delaying,setDelaying]=useState(false)
    const [add,setAdd]=useState({
      paymentid:'',
      userid:sessionStorage.getItem('userid'),
      paymentstatus:'',
      paymentamount:''

    })

    const [paymentDetails,setPaymentDetails]=useState(null)

        const stripe = useStripe();

        const elements = useElements();

        const cardElementOptions = {
            style: {
              base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "29px",
                "::placeholder": {
                  color: "#aab7c4",
                 
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          };

          const order=async(data)=>{
           
console.log(data)
            const payment={
              paymentid: data.id,
              userid:add.userid,
              paymentstatus: data.status,
              paymentamount: data.amount

            }

            const result=await addorder(payment)
            console.log(result)
            console.log(payment)
          }

          const navigate=useNavigate()

          const handleSubmit = async (event) => {
            event.preventDefault();
            console.log("inside handling submit");
          
            if (!stripe || !elements) {
              console.error("Stripe or elements not loaded");
              return;
            }
          
            const totalamount = Number(sessionStorage.getItem("totalamount"));
            if (isNaN(totalamount) || totalamount <= 0) {
              console.error("Error: Invalid amount from sessionStorage");
              return;
            }
          
            // Fetch clientSecret from backend
            const response = await fetch("http://localhost:4000/create-payment-intent", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: totalamount }),
            });
          
            const { clientSecret } = await response.json();
            console.log("Received clientSecret:", clientSecret);
          
            if (!clientSecret) {
              console.error("Error: Missing clientSecret from backend response.");
              return;
            }
          
            // Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
              payment_method: { card: elements.getElement(CardElement) },
            });
          
            if (error) {
              console.error("Payment failed:", error);
            } else if (paymentIntent.status === "succeeded") {
              toast.success("Payment successful!");
              setPaymentDetails(paymentIntent);
              sessionStorage.setItem("details", JSON.stringify(paymentIntent));
              order(paymentIntent)
              navigate("/success");
            }
          };
   
    useEffect(()=>{
        
            const totalamount=sessionStorage.getItem('totalamount')
            console.log(totalamount)
            setAmount(totalamount)
        
    

    },[amount])

    useEffect(()=>{
        if(paymentDetails){
          sessionStorage.setItem("details",JSON.stringify(paymentDetails))
        }
      },[paymentDetails])

      
  return (
    <div style={{height:'600px'}}>
        <h3 className='mb-4 text-center mt-3 mb-5'>Enter Card Details</h3>
        <div className='d-flex justify-content-center align-items-center mt-2'>
    <div >
    <div>
       <CardElement className="card-input" options={cardElementOptions}/>
    </div>

        <div className='card m-3 d-flex justify-content-center align-items-center' style={{width:'400px',height:'300px'}}>
            <h3>Shipping charge: <s>₹50</s></h3>
            <h3>Delivery charge: <s>₹60</s></h3>
            <h3 className='mt-3'>Total amount:₹{amount} </h3>
       <button className='btn btn-success mt-2' onClick={handleSubmit} disabled={!stripe}>PAY ₹{amount}</button>
        </div>
      
    </div>
    </div>
    </div>
   
  )
}

export default Checkout
