// sk_test_51M0jDkSGLmru5JSi7ATYC6pJv4w4Z8amy4VXKpiTgFlsdnivky65wSLXMUEfoPHQ31lS0mNUwzxetrBTgbOSkL5b00RNpkodQJ
// Coffee: price_1M0jkaSGLmru5JSiAnUdZgKy
// Jeans:  price_1M0jluSGLmru5JSiDK4xWkRi
// Camera: price_1M0jmSSGLmru5JSihaEJNE5C

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51M0jDkSGLmru5JSi7ATYC6pJv4w4Z8amy4VXKpiTgFlsdnivky65wSLXMUEfoPHQ31lS0mNUwzxetrBTgbOSkL5b00RNpkodQJ')

const app = express();
app.use(cors());
app.use(express.json());

app.post('/checkout', async(req, res) => {

    console.log(req.body)
    const items = req.body.items;
    const lineItems = [];
    items.forEach(item => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'

    })

    res.send(JSON.stringify({
        url: url.session
    }))


});


app.listen(4000, () => console.log('server is started on PORT 4000'))