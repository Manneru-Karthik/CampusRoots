const home = (req, res) => {
  try {
    // Access user details from `req.user` set by the `protect` middleware
    const user = req.user;
    res.status(200).json({ msg: "Welcome to the home page", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports={home};
