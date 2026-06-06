const {body} = require("express-validator");

const createTicketValidator = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Titl is required")
    .isLength({min: 3, max:120})
    .withMessage('Title must be between 3 adn 120 characters'),


    body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({min: 10 , max:2000})
    .withMessage("Description must be between 10 and 2000 characters"),


    body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
        "Bug",
        "Features Request",
        "Technical Issue",
        "Payment Issue",
        "Account Issue",
        "Other",
    ])
    .withMessage("Invalid category"),

    body("priority")
    .optional()
    .isIn(["Low", "Medium", "High", "Urgent"])
    .withMessage("Invalid priority"),
];

const assignTicketValidator = [
    body("agentId")
    .notEmpty()
    .withMessage("Agent ID is required")
    .isMongoId()
    .withMessage("Invalid agent ID"),
];

const addCommentValidator = [
    body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({min: 2, max:1000})
    .withMessage("Comment must be between 2 and 1000 characters"),
];

const updateStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Open", "In Progress", "Resolved", "Closed"])
    .withMessage("Invalid status"),

  body("note")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note cannot exceed 500 characters"),
];

module.exports = {
    createTicketValidator,
    assignTicketValidator,
    addCommentValidator,
    updateStatusValidator
};