import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Cashfree } from "cashfree-pg";

const app = express();

dotenv.config({});
const PORT = process.env.PORT;

app.use(json({ limit: "1MB" }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173', 'https://66ed98e29ba64e0ed894679f--animated-marshmallow-a661b9.netlify.app'], // Add the correct Netlify URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

import userRoutes from "./routes/user.js";
import product from "./routes/user.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", product);

const database = async () => {
  try {
    const dbInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`Db instance ${dbInstance.connection.host}`);
  } catch (error) {
    console.log(`DABASE CONNECTION FAILED`, error);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running PORT number ${PORT}`);
  database();
});
