import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seendInitialProducts } from "./services/productService";
import cartRoute from "./routes/cartRoute";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("failled connecte!", err));

//seet the producks to database
seendInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
