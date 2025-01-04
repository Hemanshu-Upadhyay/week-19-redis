import { createClient } from "redis";
const client = createClient();

async function processSubmission(users) {
  const { name, age, email } = JSON.parse(users);

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Finished processing submission for User ${users}.`);
}
async function orderprocessing(params) {
  const {
    product,
    quantity,
    customerId,
    shippingAddress,
    paymentMethod,
    shippingMethod,
    paymentStatus,
  } = req.body;

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
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

  console.log(`Finished processing order for User ${users}.`);
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    // Main loop
    while (true) {
      try {
        const users = await client.brPop("users", 0);
        // @ts-ignore
        await processSubmission(users.element);
      } catch (error) {
        console.error("Error processing submission:", error);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startWorker();
