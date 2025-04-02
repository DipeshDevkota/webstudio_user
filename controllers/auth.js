const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    console.log(passwordHash);

    await user.save();

    return res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while adding user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Req.body is:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log("User is :", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res
        .status(500)
        .json({ message: "User password not found in database" });
    }

    console.log("Stored hash:", user.password);
    console.log("Provided password:", password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPWValid", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, "Dipesh78$", { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while logging in",
      error: error.message,
    });
  }
};



const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; 
        const updatedStaff = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        
        if (!updatedStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        res.status(200).json({ message: "Staff updated successfully", staff: updatedStaff });
    } catch (error) {
        res.status(500).json({ message: "Error updating staff", error: error.message });
    }
};

const retrieve = async (req, res) => {
    try {
        const { id } = req.params; 

        const staff = await User.findById(id);

        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        res.status(200).json({ staff });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving staff", error: error.message });
    }
};

module.exports = { signup, login,update,retrieve };


