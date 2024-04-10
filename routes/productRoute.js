const express = require("express");
const {
  createProudct,
  getAllProduct,
  getSingleProdcut,
  updateProduct,
  updateImage,
  deleteProduct,
  getProductsByCategory,
  getProductDetails,

  listRelatedProduct,
  handleQuery,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const { protect, checkAdmin } = require("../middleware/protect");

const router = express.Router();

router.post(
  "/product",
  upload.single("image"),
  protect,
  checkAdmin,
  createProudct
);
router.get("/products", getAllProduct);
router.get("/product/:id", getSingleProdcut);
router.put("/product/:id", protect, checkAdmin, updateProduct);
router.put(
  "/product-image/:id",
  upload.single("image"),
  protect,
  checkAdmin,
  updateImage
);
router.delete("/product/:id", protect, checkAdmin, deleteProduct);

router.get("/product/:slug/:id", getProductDetails);

router.get("/related/product/:productId", listRelatedProduct);

router.get("/products/:slug", getProductsByCategory);

router.post("/search", handleQuery);

module.exports = router;
