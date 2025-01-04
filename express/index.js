import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

app.post("/submit", async (req, res) => {
  const { name, age, email } = req.body;
  try {
    await client.lPush("users", JSON.stringify({ name, age, email }));
    res.json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/orderprocessing", async (req, res) => {
  const {
    product,
    quantity,
    customerId,
    shippingAddress,
    paymentMethod,
    shippingMethod,
    paymentStatus,
  } = req.body;
  try {
    await client.lPush(
      "orders",
      JSON.stringify({
        product,
        quantity,
        customerId,
        shippingAddress,
        paymentMethod,
        shippingMethod,
        paymentStatus,
      })
    );
    // Fake prisma call
    // await prisma.order.create({
    //   data: {
    //     product,
    //     quantity,
    //     customerId,
    //     shippingAddress,
    //     paymentMethod,
    //     shippingMethod,
    //     paymentStatus,
    //   },
    // });
    for (let i = 0; i < 10; i++) {
      await client.lPush(
        "orders",
        JSON.stringify({
          product,
          quantity,
          customerId,
          shippingAddress,
          paymentMethod,
          shippingMethod,
          paymentStatus,
        })
      );
    }
    res.json({ message: "Order added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  await client.connect().catch((err) => console.log(err));
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
};

startServer();
