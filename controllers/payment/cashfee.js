import { Cashfree } from "cashfree-pg";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");

  return orderId.substr(0, 12);
}

export const payment = async (req, res) => {
  try {
    const { amount } = req.body;
    let request = {
      order_amount: amount,
      order_currency: "INR",
      order_id: await generateOrderId(),
      customer_details: {
        customer_id: "webcodder01",
        customer_phone: "9999999999",
        customer_name: "Web Codder",
        customer_email: "webcodder@example.com",
      },
    };

    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
