import express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
  updateItemInCart,
  deleteItemInCart,
  clearCart,
  checkout,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (err) {
<<<<<<< HEAD
    res.status(500).send("Something wes Wrong!");
=======
    res.status(500).send("Somthing went wrong!");
>>>>>>> c8b7283b583cf52c2346d78cf4bfe816e518154b
  }
});

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
<<<<<<< HEAD
    res.status(500).send("Something wes Wrong!");
=======
    res.status(500).send("Somthing went wrong!");
>>>>>>> c8b7283b583cf52c2346d78cf4bfe816e518154b
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
<<<<<<< HEAD
    res.status(500).send("Something wes Wrong!");
=======
    res.status(500).send("Somthing went wrong!");
>>>>>>> c8b7283b583cf52c2346d78cf4bfe816e518154b
  }
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
<<<<<<< HEAD
    res.status(500).send("Something wes Wrong!");
=======
    res.status(500).send("Somthing went wrong!");
>>>>>>> c8b7283b583cf52c2346d78cf4bfe816e518154b
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
<<<<<<< HEAD
      res.status(500).send("Something wes Wrong!");
=======
      res.status(500).send("Somthing went wrong!");
>>>>>>> c8b7283b583cf52c2346d78cf4bfe816e518154b
    }
  }
);

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Somthing went wrong!");
  }
});
export default router;
