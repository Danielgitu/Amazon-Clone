const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
"sk_test_51NtZYiJGW2oj6Y9wEQuKbgqtAH4L9tVG0X8vsfy84jSliTUhMhXgU2gTpnS2BzDRPrMuRX40rQyMzwPWQuFjJjHX00g4a91wF8"
);

const app = express();

app.use(cors({ origni: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  // console.log("Payment Request Received!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// To start command = firebase emulators:start
// Command to deploy the backend = firebase deploy --only functions
// Command to deploy the frontend = firebase deploy --only hosting

// http://127.0.0.1:5001/clone-695d6/us-central1/api
