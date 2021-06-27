import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;

    const publishableKey = 'pk_test_51J2ztZHwHjq5bela7Z9zTLhZyLNJs5gJVI0VG57UozjzGowuUDtSKZ0OJnEtGyJ2rvC4vbMiQ19J7t1dUOBOOQm300p1y16VDU';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            console.log('Payment error', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure to use provided credit card');
        })
    }

    return (
        <StripeCheckout
            label = 'Pay Now'
            name = 'Clothing Store'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel = 'Pay Now'
            token ={onToken}
            stripeKey = {publishableKey}
        />
    )
}


export default StripeCheckoutButton;