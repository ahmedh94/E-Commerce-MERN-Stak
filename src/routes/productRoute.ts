import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req, res) => {
  const prouducts = await getAllProducts();
  res.status(200).send(prouducts);
});

export default router;
