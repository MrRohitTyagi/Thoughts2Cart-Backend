const stripe = require("stripe")(process.env.STRIPE_KEY);

console.log(process.env.CLIENT_URL, "jdfhasdhfhasvhjds");
console.log(process.env.STRIPE_KEY, "jdfhasdhfhasvhjds");

exports.paymentProcessor = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.map((item) => {
        console.log(item);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item?.description?.slice(0, 15) + "..." || "No name",
            },
            unit_amount: item.price * 100,
          },
          quantity: item.count,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/viewProfile/1`,
      cancel_url: `${process.env.CLIENT_URL}/viewProfile/0`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
