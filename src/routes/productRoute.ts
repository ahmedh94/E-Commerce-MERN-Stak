import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prouducts = await getAllProducts();
    res.status(200).send(prouducts);
  } catch (err) {
    res.status(500).send("Something wes Wrong!");
  }
});

export default router;
