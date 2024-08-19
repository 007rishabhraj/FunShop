import express from "express";
import helmet from "helmet";
import cors from "cors";
export const app = express();
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";

const corsOption = {
  origin: ["https://funshop.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use('/review',reviewRouter);
