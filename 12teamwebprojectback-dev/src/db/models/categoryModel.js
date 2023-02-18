import { model } from "mongoose";
import { CategorySchema } from "../schemas/categorySchema";

const Category = model("Categories", CategorySchema);

export default Category;