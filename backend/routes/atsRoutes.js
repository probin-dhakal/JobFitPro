const express = require("express");
const router = express.Router();
const { checkATSScore } = require("../controllers/atsController");

router.post("/ats-score", checkATSScore);

module.exports = router;
