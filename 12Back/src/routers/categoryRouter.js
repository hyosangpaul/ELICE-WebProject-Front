import express from "express";
import { showAllCategories, findOneCategory, addCategory, editCategory, deleteCategory } from "../services/categoryService";
import { adminOnly } from "../middlewares/adminRequired"
const categoryRouter = express.Router();

categoryRouter.get("/", showAllCategories);
categoryRouter.get("/:categoryId", findOneCategory);
categoryRouter.post("/add", adminOnly, addCategory);
categoryRouter.post("/edit/:categoryId", adminOnly, editCategory);
categoryRouter.delete("/delete/:categoryId", adminOnly, deleteCategory);

export default categoryRouter;
