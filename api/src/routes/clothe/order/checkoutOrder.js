const { Router } = require("express");
require("dotenv").config();
const router = Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

router.post("/", async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      payment_method: id,
      currency: "ARS",
      description: "ecommerce7-henry",
      confirm: true,
    });
    console.log(payment);
    res.send({ message: "succesful payment", status: 202 });
  } catch (err) {
    res.send({ message: err, status: 404 });
  }
});

module.exports = router;
