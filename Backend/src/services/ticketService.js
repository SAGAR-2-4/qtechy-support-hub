const Ticket = require("../models/Ticket");
const User = require("../models/User")

const createTicket = async (ticketData, userId) => {
  const ticket = await Ticket.create({
    ...ticketData,
    createdBy: userId,
  });

  return ticket;
};

const getTickets = async (user, queryParams) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,

  } = queryParams;

  const filter = {};


  if (user.role === "user") {
    filter.createdBy = user._id;
  }

  if (user.role === "user") {
    filter.createdBy = user._id;
  }

  if (user.role === "agent") {
    filter.assignedTo = user._id;
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  const skip = (page - 1) * limit;


  const ticket = await Ticket.find(filter)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .sort({ createAt: - 1 })
    .skip(skip)
    .limit(Number(limit));


  const total = await Ticket.countDocuments(filter);

  return {
    ticket,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit)
    },
  };
  ;
}

const assignTicket = async (ticketId, agentId, adminId) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    const error = new Error("Ticket is not found");
    error.statusCode = 404;
    throw error;
  }

  const agent = await User.findOne({
    _id: agentId,
    role: "agent",
    isActive: true,
  });

  if (!agent) {
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
    status: "In Progress",
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

const addComment = async (ticketId, comment, user) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const isAdmin = user.role === "admin";
  const isCreator = ticket.createdBy.toString() === user._id.toString();
  const isAssignedAgent =
    ticket.assignedTo && ticket.assignedTo.toString() === user._id.toString();

  if (!isAdmin && !isCreator && !isAssignedAgent) {
    const error = new Error("You are not allowed to comment on this ticket");
    error.statusCode = 403;
    throw error;
  }

  ticket.comments.push({
    comment,
    commentedBy: user._id,
  });

  await ticket.save();

  const updatedTicket = await Ticket.findById(ticket._id)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .populate("comments.commentedBy", "name email")
    .populate("statusHistory.changedBy", "name email");

  return updatedTicket;
};

const updateTicketStatus = async (ticketId, status, note, user) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }
  const isAdmin = user.role === "admin";
  const isAssignedAgent =
    ticket.assignedTo && ticket.assignedTo.toString() === user._id.toString();

  if (!isAdmin && !isAssignedAgent) {
    const error = new Error("You are not allowed to update this ticket status");
    error.statusCode = 403;
    throw error;
  }

  if (ticket.status === status) {
    const error = new Error(`Ticket status is already ${status}`);
    error.statusCode = 400;
    throw error;
  }

  ticket.status = status;

  ticket.statusHistory.push({
    status,
    changedBy: user._id,
    note: note || `Status changed to ${status}`,
  });

  await ticket.save();

  const updatedTicket = await Ticket.findById(ticket._id)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .populate("comments.commentedBy", "name email")
    .populate("statusHistory.changedBy", "name email");

  return updatedTicket;
};

const getTicketById = async (ticketId, user) => {
  const ticket = await Ticket.findById(ticketId)
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role")
    .populate("comments.commentedBy", "name email role")
    .populate("statusHistory.changedBy", "name email role");

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const isAdmin = user.role === "admin";
  const isCreator = ticket.createdBy._id.toString() === user._id.toString();
  const isAssignedAgent =
    ticket.assignedTo &&
    ticket.assignedTo._id.toString() === user._id.toString();

  if (!isAdmin && !isCreator && !isAssignedAgent) {
    const error = new Error("You are not allowed to view this ticket");
    error.statusCode = 403;
    throw error;
  }

  return ticket;
};

const getMyTickets = async (userId) => {
  const tickets = await Ticket.find({ createdBy: userId })
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role")
    .populate("comments.commentedBy", "name email role")
    .populate("statusHistory.changedBy", "name email role")
    .sort({ created: -1 });

  return tickets;
}

const updateTicket = async (ticketId, updateData, user) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const isAdmin = user.role === "admin";
  const isCreator = ticket.createdBy.toString() === user._id.toString();

  if (!isAdmin && !isCreator) {
    const error = new Error("You are not allowed to edit this ticket");
    error.statusCode = 403;
    throw error;
  }

  if (!isAdmin && ticket.status !== "Open") {
    const error = new Error("You can only edit your ticket while it is Open");
    error.statusCode = 400;
    throw error;
  }

  let allowedFields = [];

  if (isAdmin) {
    allowedFields = ["category", "priority"];
  } else {
    allowedFields = ["title", "description", "category", "priority"];
  }

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      ticket[field] = updateData[field];
    }
  });
  await ticket.save();

  return await Ticket.findById(ticket._id)
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role")
    .populate("comments.commentedBy", "name email role")
    .populate("statusHistory.changedBy", "name email role");
};

const deleteTicket = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  await ticket.deleteOne();

  return ticket;
};

module.exports = {
  createTicket,
  getTickets,
  assignTicket,
  addComment,
  updateTicketStatus,
  getTicketById,
  getMyTickets,
  updateTicket,
  deleteTicket,
};


