const dotenv = require('dotenv');
dotenv.config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);


module.exports = {

    createPayment: async(req, res) => {
        try {
            const { name } = req.body;
            const { amount } = req.body;
            if (!name && !amount) return res.status(400).json({ message: "Please provide require information" });
            const paymentIntent = await stripe.paymentIntents.create({
              amount: Math.round(amount * 100),
              currency: "USD",
              payment_method_types: ["card"],
              metadata: { name: name },
            });
            const clientSecret = paymentIntent.client_secret;
            res.json({ message: "Payment initiated", clientSecret });
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          }
    },
// Order Fullfillment
// stripeHook: async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = await stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: err.message });
//   }

//   // Event when a payment is initiated
//   if (event.type === "payment_intent.created") {
//     console.log(`${event.data.object.metadata.name} initated payment!`);
//   }
//   // Event when a payment is succeeded
//   if (event.type === "payment_intent.succeeded") {
//     console.log(`${event.data.object.metadata.name} succeeded payment!`);
//     // fulfilment
//   }
//   res.json({ ok: true });
// }


    


}