import paypal from "@paypal/checkout-server-sdk";

export default async function handler(req, res) {
  const Environment =
    "production" === "production"
      ? paypal.core.LiveEnvironment
      : paypal.core.SandboxEnvironment;

  const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    )
  );

  const order = req.body;
  const total = order.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  const request = new paypal.orders.OrdersCreateRequest();

  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items: order.map((item) => {
          return {
            name: item.title,
            unit_amount: {
              currency_code: "USD",
              value: item.price,
            },
            quantity: item.count,
          };
        }),
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json(err);
  }
}
