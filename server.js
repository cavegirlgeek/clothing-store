//build server using express

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


if (process.env.NODE_ENV!=='production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const app = express(); //express is a library that allows us to build an API server easily
const port = process.env.PORT || 5000; //WHEN YOU deploy to Heroku, it sets up the process PORT for you.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

if(process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
})

//build route for stripe payment
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({error: stripeErr});
        } else {
            res.status(200).send({success: stripeRes});
        }
    })
})