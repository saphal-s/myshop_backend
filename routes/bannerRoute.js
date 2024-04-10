const express = require("express");
const {
  createBanner,
  allBanners,
  deleteBanner,
} = require("../controllers/bannerController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/banner", upload.single("image"), createBanner);
router.get("/banners", allBanners);
router.delete("/banner/:id", deleteBanner);

module.exports = router;
