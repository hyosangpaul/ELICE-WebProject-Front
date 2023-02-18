import express from "express";
import { changeUser, seeMyPage, deleteUser } from "../services/userService";

import { getOrder, deleteOrder } from "../services/orderService";
import { loginRequired } from "../middlewares/loginrequired.js";

const userRouter = express.Router();

userRouter.get("/myPage", loginRequired, seeMyPage);
userRouter.get("/orders", loginRequired, getOrder);
userRouter.delete("/orders/:orderId", deleteOrder);

userRouter.post("/edit/:userId", loginRequired, changeUser);
userRouter.post("/delete/:userId", loginRequired, deleteUser);

export default userRouter;
