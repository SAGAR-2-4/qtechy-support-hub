const Ticket = require("../models/Ticket");
const User = require("../models/User")

const createTicket = async (ticketData, userId) => {
    const ticket = await Ticket.create({
        ...ticketData,
        createdBy: userId,
    });

    return ticket;
};

const getTickets = async(user, queryParams) => {
    const {
        page = 1,
        limit= 10,
        status,
        priority,

    } = queryParams;

    const filter = {};

    
    if(user.role === "user"){
        filter.createdBy = user._id;
    }

    if(user.role === "user"){
        filter.createdBy = user._id;
    }

    if(user.role === "agent"){
        filter.assignedTo = user._id;
    }

    if(status){
        filter.status = status;
    }

    if(priority){
        filter.priority = priority;
    }

    const skip = (page - 1) * limit;
    

    const ticket = await Ticket.find(filter)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email")
        .sort({createAt: - 1})
        .skip(skip)
        .limit(Number(limit));


        const total = await Ticket.countDocuments(filter);

        return{
            ticket,
            pagination:{
                page:Number(page),
                limit:Number(limit),
                total,
                totalPages:Math.ceil(total / limit)
            },
        };
;
}

const assignTicket = async(ticketId,agentId, adminId) => {
    const ticket = await Ticket.findById(ticketId);

    if(!ticket)  {
        const error = new Error("Ticket is not found");
        error.statusCode = 404;
        throw error;
    }

    const agent = await User.findOne({
        _id:agentId,
        role:"agent",
        isActive:true,
    });

    if(!agent){
        const error = new Error("Selected user is not valid active agent");
        error.statusCode = 400;
        throw error;
        
    }
    if (ticket.assignedTo && ticket.assignedTo.toString() === agentId) {
        const error = new Error("Ticket is already assigned to this agent");
        error.statusCode = 400;
     throw error;
    }

    ticket.assignedTo = agentId;
    ticket.status = "In Progress";

    ticket.statusHistory.push({
        status : "In Progress",
        changedBy: adminId,
        note: `Ticket assigned to ${agent.name}`,
    });
    await ticket.save();

const updatedTicket = await Ticket.findById(ticket._id)
  .populate("createdBy", "name email")
  .populate("assignedTo", "name email")
  .populate("statusHistory.changedBy", "name email");

return updatedTicket;
};

module.exports = {
    createTicket,
    getTickets,
    assignTicket,
};


