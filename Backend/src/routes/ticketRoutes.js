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
  updateTicketStatus,
  getTicketById,
  getMyTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const {
  createTicketValidator,
  assignTicketValidator,
  addCommentValidator,
  updateStatusValidator,
  updateTicketValidator,
} = require("../validators/ticketValidator");



router.post("/", protect, createTicketValidator, validateRequest, createTicket);

router.get("/", protect, getTickets);
router.get("/my-tickets", protect, getMyTickets);
router.patch(
  "/:ticketId",
  protect,
  updateTicketValidator,
  validateRequest,
  updateTicket
);

router.delete(
  "/:ticketId",
  protect,
  authorize("admin"),
  deleteTicket
);



router.get("/:ticketId", protect, getTicketById);


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

router.patch(
  "/:ticketId/status",
  protect,
  updateStatusValidator,
  validateRequest,
  updateTicketStatus
);





module.exports = router;


