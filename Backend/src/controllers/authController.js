const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
    try{
        res.status(200).json({
            success: true,
            message: "Current user fetched successfully",
            data:{
                user:{
                    id:req.user._id,
                    name:req.user.name,
                    email:req.user.email,
                    role:req.user.role,
                    isActive:req.user.isActive,
                }
            }
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
  register,
  login,
  getMe
};