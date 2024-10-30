var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // Send a JSON response instead of rendering a view
  res.json({ message: "I am the home page" });
});

module.exports = router;
