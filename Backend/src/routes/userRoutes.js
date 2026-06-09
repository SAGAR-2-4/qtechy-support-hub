const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
  getAllUsers,
  getAgents,
  updateUserRole,
} = require("../controllers/userController");

const { updateRoleValidator } = require("../validators/userValidator");

router.get("/", protect, authorize("admin"), getAllUsers);

router.get("/agents", protect, authorize("admin"), getAgents);

router.patch(
  "/:userId/role",
  protect,
  authorize("admin"),
  updateRoleValidator,
  validateRequest,
  updateUserRole
);

module.exports = router;