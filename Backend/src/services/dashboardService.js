const Ticket = require("../models/Ticket");

const User =  require("../models/User");

const getDashboardStats  =  async () => {
    const [
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        closedTickets,
        urgentTickets,
        unassignedTickets,
        totalUsers,
        totalAgents,
    ] = await Promise.all([
        Ticket.countDocuments(),
        Ticket.countDocuments({status: "Open"}),
        Ticket.countDocuments({status: "In Progress"}),
        Ticket.countDocuments({status : "Resolved"}),
        Ticket.countDocuments({status: "Closed"}),
        Ticket.countDocuments({priority:"Urgent"}),
        Ticket.countDocuments({assignedTo:null}),
        User.countDocuments({role:"user"}),
        User.countDocuments({role:"agent"}),
    ]);

    return {
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        closedTickets,
        urgentTickets,
        unassignedTickets,
        totalUsers,
        totalAgents,
    };
};

module.exports = {
    getDashboardStats,
}