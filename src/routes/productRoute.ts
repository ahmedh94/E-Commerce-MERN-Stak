import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prouducts = await getAllProducts();
    res.status(200).send(prouducts);
  } catch (err) {
<<<<<<< HEAD
    res.status(500).send("Something wes Wrong!");
=======
    res.status(500).send("Somthing went wrong!");
>>>>>>> c8b7283b583cf52c2346d78cf4bfe816e518154b
  }
});

export default router;
