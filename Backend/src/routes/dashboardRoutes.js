const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {authorize} = require("../middleware/roleMiddleware");

const {getDashboardStats} = require("../controllers/dashboardController");

router.get("/stats", protect, authorize("admin"), getDashboardStats);

module.exports = router;