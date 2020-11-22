const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const auth = require("../middleware/auth");

//express validator
router.post(
  "/",
  check("productName", "Product name is required").exists(),
  check("quantity", "Quantity is required").exists(),
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { productName, productId, quantity, description } = req.body;

    try {
      const check = await Product.findOne({ productName, userId });
      if (check) {
        return res.status(400).json({ msg: "Product already registered" });
      }

      const product = { productName, quantity, userId };
      if (productId) product.productId = productId;
      if (description) product.description = description;

      const productSave = new Product(product);
      const response = await productSave.save();

      res.json(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const products = await Product.find({ userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:productName", auth, async (req, res) => {
  const userId = req.user.id;
  const productName = req.params.productName;

  try {
    const product = await Product.findOne({ userId, productName });

    if (!product) {
      return res.status(400).json({ msg: `${productName} is not registered` });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// express validator
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { productName, productId, quantity, description } = req.body;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ msg: `Not a product` });
    }

    const update = {};
    if (productName) update.productName = productName;
    if (productId) update.productId = productId;
    if (quantity) update.quantity = quantity;
    if (description) update.description = description;

    await Product.findByIdAndUpdate(id, { $set: update }, { new: true });

    const response = await Product.findById(id);
    res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ msg: `Not a product` });
    }

    await Product.findByIdAndRemove(id);
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
