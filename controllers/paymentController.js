const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.paymentProcessor = async (req, res) => {
  const { items, paymentgateWayCode } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item?.description?.slice(0, 15) + "..." || "No name",
            },
            unit_amount: Number(item.price) * 100,
          },
          quantity: item.count,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/viewProfile/1/${paymentgateWayCode}`,
      cancel_url: `${process.env.CLIENT_URL}/viewProfile/1/${paymentgateWayCode}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
