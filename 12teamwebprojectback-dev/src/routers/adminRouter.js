import express from "express";
import { getAdmin, handleOrder, handleChange, handleDelete } from "../services/adminService";
import { adminOnly } from "../middlewares/adminRequired";

const adminRouter = express.Router();

adminRouter.get("/", getAdmin);
adminRouter.get("/orders", adminOnly, handleOrder);
adminRouter.post("/orders/:orderId", handleChange);
adminRouter.delete("/orders/:orderId", adminOnly, handleDelete);

export default adminRouter;
