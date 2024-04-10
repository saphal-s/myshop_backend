const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      defalut: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("banners", bannerSchema);
