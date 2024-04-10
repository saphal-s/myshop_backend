const express = require("express");
const {
  register,
  getAllUsers,
  getUser,
  updateUser,
  login,
  createcodOrder,
  getOrders,
  getOrder,
  orderStatus,
  getOrdersByUserId,
} = require("../controllers/userController");
const { protect, checkAdmin } = require("../middleware/protect");

const router = express.Router();
// req->requres, res->response, 200-> success status code
// router.get("/user", (req, res) => {
//   res.status(200).json({ message: "user find" });
// });

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/users", protect, checkAdmin, getAllUsers);
router.get("/user/:id", protect, getUser);
router.put("/user/:id", protect, updateUser);


router.post("/user/order", protect, createcodOrder);

router.post("/orders", protect, checkAdmin, getOrders);

router.get("/single-order/:id", protect, checkAdmin, getOrder);
router.put("/order-status", protect, checkAdmin, orderStatus);
router.get("/user-order/:userId", protect, getOrdersByUserId);

module.exports = router;
