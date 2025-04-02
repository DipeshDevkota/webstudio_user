const User = require('../models/user');

const fetchUser = async (req, res) => {
    try {
      const users = await User.find(); 
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found!" });
      }
  
      return res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while fetching user details",
        error: error.message,
      });
    }
};

module.exports = { fetchUser };  