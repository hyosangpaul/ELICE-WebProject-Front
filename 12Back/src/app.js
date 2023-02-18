import cors from "cors";
import express from "express";
import "./db/index";
import cookieParser from "cookie-parser";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import adminRouter from "./routers/adminRouter";
import productRouter from "./routers/productRouter";
import categoryRouter from "./routers/categoryRouter";

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

app.use(cookieParser());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를
// 인식하고 핸들링할 수 있게 함.

app.use(express.urlencoded({ extended: false }));

app.use("/api", rootRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

export default app;
