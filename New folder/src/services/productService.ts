import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seendInitialProducts = async () => {
  try {
    const products = [
      {
        title: "samsung galaxy a35",
        image:
          "https://myxprs.com/cdn/shop/files/samsung-galaxy-a35-5g-8gb-128gb-1year-warranty-492909.png?v=1721743572",
        price: 14970,
        stock: 10,
      },
      /*{ title: "Test Product", image: "image1.jpg", price: 10, stock: 100 },
    { title: "Product 1", image: "image1.jpg", price: 10, stock: 100 },
    { title: "Product 2", image: "image2.jpg", price: 20, stock: 80 },
    { title: "Product 3", image: "image3.jpg", price: 15, stock: 50 },
    { title: "Product 4", image: "image4.jpg", price: 25, stock: 70 },
    { title: "Product 5", image: "image5.jpg", price: 5, stock: 90 },
    { title: "Product 6", image: "image6.jpg", price: 30, stock: 60 },
    { title: "Product 7", image: "image7.jpg", price: 35, stock: 40 },
    { title: "Product 8", image: "image8.jpg", price: 40, stock: 30 },
    { title: "Product 9", image: "image9.jpg", price: 45, stock: 20 },
    { title: "Product 10", image: "image10.jpg", price: 50, stock: 10 },*/
    ];

    const existingProducks = await getAllProducts();

    if (existingProducks.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};
