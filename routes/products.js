import express from "express";
const router = express.Router();
import fetch from "node-fetch";
import { getCategoryList } from "../helpers";

router.get("/items", async (req, res) => {
  const data = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
  );
  const products = await data.json();

  const productsResult = products.results.slice(0, 4).map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: {
        currency: product.currency_id,
        amount: product.price,
        decimals: 0,
      },
      picture: product.thumbnail,
      condition: product.condition,
      free_shipping: product.shipping.free_shipping,
      address: product.address,
    };
  });
  const categoryIds = [
    ...new Set(products.results.map((result) => result.category_id)),
  ];
  const categories = await getCategoryList(categoryIds);

  const objectProduct = {
    author: {
      name: "Juan Sebastian",
      lastname: "Parra Niño",
    },
    items: productsResult,
    categories,
  };

  res.send(objectProduct);
});

router.get("/items/:id", async (req, res) => {
  const data = await fetch(
    `https://api.mercadolibre.com/items/${req.params.id}`
  );
  const product = await data.json();

  const dataDescription = await fetch(
    `https://api.mercadolibre.com/items/${req.params.id}/description`
  );
  const productDescription = await dataDescription.json();

  const categories = await getCategoryList([product.category_id]);

  const informationProduct = {
    author: {
      name: "Juan Sebastian",
      lastname: "Parra Niño",
    },
    item: {
      id: product.id,
      title: product.title,
      price: {
        currency: product.currency_id,
        amount: product.price,
        decimals: 0,
      },
      picture: product.pictures[0].url,
      condition: product.condition,
      free_shipping: product.shipping.free_shipping,
      sold_quantity: product.sold_quantity,
      description: productDescription.plain_text,
    },
    categories,
  };
  res.send(informationProduct);
});

//export Router
module.exports = router;
