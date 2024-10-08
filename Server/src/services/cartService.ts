import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface CreateCartFoUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartFoUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}
export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  //Does the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  //fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Not enough stock!", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  //Update the totalAmount for the cart
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item not found in cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Not enough stock!", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculatCartTotalItems({ cartItems: otherCartItems });

  existsInCart.quantity = quantity;

  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item not found in cart!", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = calculatCartTotalItems({ cartItems: otherCartItems });

  cart.items = otherCartItems;

  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

const calculatCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};

interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  const cart = await getActiveCartForUser({ userId });

  if (!address) {
    return { data: "Address is required!", statusCode: 400 };
  }

  const orderItems: IOrderItem[] = [];
  //loop cartItems and create orderItemds

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);

    if (!product) {
      return { data: "Product not found!", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();

  // Update the cart status to be completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};
