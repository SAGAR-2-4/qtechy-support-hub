const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
  createTicket,
  getTickets,
  assignTicket,
  addComment,
} = require("../controllers/ticketController");

const {
  createTicketValidator,
  assignTicketValidator,
  addCommentValidator,
} = require("../validators/ticketValidator");

router.post("/", protect, createTicketValidator, validateRequest, createTicket);

router.get("/", protect, getTickets);

router.patch(
  "/:ticketId/assign",
  protect,
  authorize("admin"),
  assignTicketValidator,
  validateRequest,
  assignTicket
);

router.post(
  "/:ticketId/comments",
  protect,
  addCommentValidator,
  validateRequest,
  addComment
);

module.exports = router;