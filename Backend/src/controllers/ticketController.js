const ticketService = require("../services/ticketService");

const createTicket = async (req, res, next) => {
    try{
        const ticket = await ticketService.createTicket(
            req.body,
            req.user._id
        );

        res.status(201).json({
            success:true,
            message : "Ticket created successfully",
            data: ticket,
        });
    }catch (error) {
        next(error);
    }
};

const getTickets = async (req, res, next) => {
    try{
        const result = await ticketService.getTickets(
            req.user,
            req.query
        );
        res.status(200).json({
            success: true,
            data: result,
        });
        
    }catch (error){
        next(error);
    }
};

const assignTicket = async(req, res, next) => {
    try{
        const ticket = await ticketService.assignTicket(
            req.params.ticketId,
            req.body.agentId,
            req.user._id
        );

        res.status(200).json({
            success: true,
            message: "Ticket assigned successfully",
            data: ticket,
        })
    }catch(error){
        next(error);

    }
};

const addComment = async (req, res, next) => {
    try{
        const ticket = await ticketService.addComment(
            req.params.ticketId,
            req.body.comment,
            req.user
        );
        
        res.status(200).json({
            success: true,
            message: 'Comment added successfully',
            data: ticket,
        });

    }catch(error){
        next(error);
    }
};
const updateTicketStatus = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicketStatus(
      req.params.ticketId,
      req.body.status,
      req.body.note,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    createTicket,
    getTickets,
    assignTicket,
    addComment,
    updateTicketStatus,
};