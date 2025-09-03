import User from "../models/User.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            data: null,
            message: "Please provide all required fields"
        })
    }

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "User with this email already exists"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            success: true,
            data: savedUser,
            message: "User created successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: error.message
        });
    }
}

export { createUser };