const {body} = require("express-validator");

const updateRoleValidator = [
    body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user","agent", "admin"])
    .withMessage("Role must be user,agent, or admin"),

];

module.exports = {
    updateRoleValidator,
};
