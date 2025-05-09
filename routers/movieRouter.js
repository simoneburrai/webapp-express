const movieController = require("../controllers/movieController");

const express = require("express");
const router = express.Router();

router.get("/", movieController.index);
router.get("/:id", movieController.show);


module.exports = router;