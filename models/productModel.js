const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },

    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      defalut: "",
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    ratings: [
      {
        star: Number,
        givenBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
