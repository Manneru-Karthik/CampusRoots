
const adminmodels=require('../models/Adminmodel');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');


const login = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Validate input
    if (!username || !password || !role) {
      return res.status(400).json({ msg: "Please provide Gmail, Password, and Role" });
    }

    // Fetch user based on role
    let user;
    user= await adminmodels.findOne({"username":username});
    // Check if user exists
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      id: user._id,
      role: role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      msg: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports={login};