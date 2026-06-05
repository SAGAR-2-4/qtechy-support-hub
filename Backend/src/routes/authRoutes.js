const express = require('express');
const {register, login, getMe} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');
const { authorize } = require("../middleware/roleMiddleware");
const {
    registerValidator,
    loginValidator
} = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.get("/me", protect, getMe);
router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
    });
  }
);
module.exports = router;
