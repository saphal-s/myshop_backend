const express = require("express");
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/categoryController");
const { protect, checkAdmin } = require("../middleware/protect");

const router = express.Router();

router.post("/category", protect, checkAdmin, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", protect, checkAdmin, update);
router.delete("/category/:slug", protect, checkAdmin, remove);

module.exports = router;
