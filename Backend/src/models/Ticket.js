const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, "Comment is required"],
            trim: true,
            maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const statusHistorySchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        note: {
            type: String,
            trim: true,
            maxlength: [500, "Note cannot exceed 500 characters"],
        },
    },
    { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
    {
        ticketNumber: {
            type: String,
            unique: true,
            index: true,
        },

        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [120, "Title cannot exceed 120 characters"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },

        category: {
            type: String,
            enum: [
                "Bug",
                "Feature Request",
                "Technical Issue",
                "Payment Issue",
                "Account Issue",
                "Other",
            ],
            required: [true, "Category is required"],
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Urgent"],
            required: [true, "Priority is required"],
            default: "Medium",
        },

        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            default: "Open",
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        comments: [commentSchema],

        statusHistory: [statusHistorySchema],
    },
    { timestamps: true }
);

ticketSchema.pre("save", async function () {
  if (this.ticketNumber) return;

  const lastTicket = await this.constructor
    .findOne({ ticketNumber: { $exists: true } })
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastTicket?.ticketNumber) {
    const lastNumber = parseInt(
      lastTicket.ticketNumber.replace("TKT-", ""),
      10
    );

    nextNumber = lastNumber + 1;
  }

  this.ticketNumber = `TKT-${String(nextNumber).padStart(4, "0")}`;
});

module.exports = mongoose.model("Ticket", ticketSchema);