const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find().select("-password").sort({ createdAt: -1 });
};

const getAgents = async () => {
  return await User.find({ role: "agent", isActive: true })
    .select("-password")
    .sort({ name: 1 });
};

const updateUserRole = async (userId, role, adminId) => {
  if (userId === adminId.toString()) {
    const error = new Error("You cannot change your own role");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  user.role = role;
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
};

module.exports = {
  getAllUsers,
  getAgents,
  updateUserRole,
};