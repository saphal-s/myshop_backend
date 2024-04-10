const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/orderModel");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(500).json({ message: "User already exits." });
  } else {
    const hashPassword = bcryptjs.hashSync(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (user) {
      let token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1hr",
        }
      );

      res.status(200).json({
        success: true,
        message: "User created sucessfully.",
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      });
    }
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (user && isValidPassword) {
      let token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1hr",
        }
      );
      res.status(200).json({
        success: true,
        message: "User loggedin sucessfully.",
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ message: "User doesn't exits!." });
  }
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json(user);
};

module.exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, password },
    { new: true }
  );
  res.json(updatedUser);
};

exports.createcodOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      country,
      postcode,
      phone,
      paymentIntent,
      isPaid,
      totalAmount,
      orderdBy,
    } = req.body;
    const products = req.body.products;

    let newOrder = await new Order({
      products: products,
      paymentIntent: paymentIntent,
      deliveryDetails: {
        name: name,
        email: email,
        address: address,
        country: country,
        postcode: postcode,
        phone: phone,
      },
      isPaid: isPaid,
      orderdBy: orderdBy,
      totalAmount: totalAmount,
    }).save();
    res.status(200).json({
      success: true,
      message: "Ordered sucessfully.",
      newOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  const status = req.body.orderStatus;
  // console.log(status);
  // If status is provided, filter based on it; otherwise, get all orders
  const filter = status ? { orderStatus: status } : {};
  try {
    const orders = await Order.find(filter).sort("-createdAt").exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    let order = await Order.findOne({ _id: req.params.id }).exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  // console.log(orderId, orderStatus);
  try {
    let updated = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    let userId = req.params.userId;
    console.log(userId);
    let orders = await Order.find({ orderdBy: userId }).exec();
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified user ID" });
    }
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
