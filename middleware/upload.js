const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
// var upload = multer({ storage: storage });

var upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const error = new Error(
        "Only .png, .jpg, .jpeg, .gif and .webp format allowed!"
      );
      error.name = "ExtensionError";
      return cb(error);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 1024 * 2,
  },
});

module.exports = upload;
