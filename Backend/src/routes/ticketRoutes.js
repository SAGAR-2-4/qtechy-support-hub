const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const {createTicket, getTickets, assignTicket}= require("../controllers/ticketController")

const {createTicketValidator, assignTicketValidator} = require("../validators/ticketValidator");

const validateRequest = require("../middleware/validateRequest");

const { authorize } = require("../middleware/roleMiddleware");

router.post(
    "/",
    protect,
    createTicketValidator,
    validateRequest,
    createTicket,
    
);

router.get(
    "/",
    protect,
    getTickets
)

router.patch(
    "/:ticketId/assign",
    protect,
    authorize("admin"),
    assignTicketValidator,
    validateRequest,
    assignTicket
);

module.exports =  router;