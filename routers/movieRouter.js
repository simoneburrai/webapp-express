const movieController = require("../controllers/movieController");

const express = require("express");
const router = express.Router();

router.get("/", movieController.index);
router.post("/", movieController.store);
router.get("/:id", movieController.show);
router.post("/:id/reviews", movieController.reviewStore)

module.exports = router;