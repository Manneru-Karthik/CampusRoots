
const alumnimodel=require('../models/Alumnimodel');
const studentmodel=require('../models/Studentmodel');
const bcrypt=require('bcryptjs')

const login = async (req, res) => {
  const { gmail, password, role } = req.body;
  try {
    // Validate input
    if (!gmail || !password || !role) {
      return res.status(400).json({ msg: "Please provide Gmail, Password, and Role" });
    }

    // Fetch user based on role
    let user;
    if (role === 'alumni') {
      user = await alumnimodel.findOne({"gmail": gmail });
    } else if (role === 'student') {
      user = await studentmodel.findOne({"gmail": gmail });
    } else {
      return res.status(400).json({ msg: "Invalid role specified" });
    }

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

    res.json({
      msg: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


const jwt = require('jsonwebtoken');


const protect = async (req, res, next) => {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ msg: 'No token provided, authorization denied' });
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      const role=decoded.role;
      const id=decoded.id;
      // Fetch user based on role
      let requser;
      if (role === 'alumni') {
        requser = await alumnimodel.findById(id);
      } else if (role === 'student') {
        requser = await studentmodel.findById(id);
      } else {
        return res.status(400).json({ msg: "Invalid role specified" });
      }
      console.log(requser);
      // If user not found
      if (!requser) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      // Compare passwords
  
      // Check if password was changed after token issued
      const isPasswordChanged = await requser.isPasswordChanged(req.body.tokenIat); // Pass the token issued at time
      if (isPasswordChanged) {
        return res.status(401).json({ msg: "Password changed recently. Please login again." });
      }
   
      // Attach user to request object
      req.user = requser;

      // Pass to the next middleware/route handler
      next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Token is not valid" });
      }
    };
module.exports = { login, protect };
