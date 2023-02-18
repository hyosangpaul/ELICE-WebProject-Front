import {model} from "mongoose";
import {OrderSchema} from "../schemas/orderSchema.js";

const Order = model("orders", OrderSchema);

export default Order;
