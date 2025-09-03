import passport from "passport";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Please provide all required fields",
    });
  }

  const isUserAlreadyExists = await User.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "User with this email already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      data: savedUser,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error?.message,
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: info?.message,
      });
    }

    const JWT = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
        success: true,
        data: user,
        token: JWT,
        message: "Login successful"
    });
  })(req, res, next);
};

export { createUser, loginUser };
