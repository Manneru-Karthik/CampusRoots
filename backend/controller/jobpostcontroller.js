const jobmodel = require('../models/Jobmodel.js');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

// Multer configuration for handling file uploads
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'jobuploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

// Controller to get all job posts
const getjobposts = async (req, res) => {
    try {
      // Fetch all job posts from the Jobmodel
      const jobs = await jobmodel.find();
  
      // Send the retrieved jobs as a response
      res.status(200).json(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      res.status(500).json({ error: "Failed to fetch job posts" });
    }
  };
  
  

// Controller to post a new job
const postjobposts = async (req, res) => {
    console.log(req.body);
    try {
      const {
        title,
        company,
        jobUrl,
        location,
        description,
        qualification,
        applicationDeadline,
        postedBy // Extract postedBy as a string
      } = req.body;
  
      // Parse the postedBy field (it should be a JSON string)
      const parsedUser = JSON.parse(req.body.postedBy);
  
      // Validate required fields
      if (!title || !company || !location || !description || !qualification || !applicationDeadline || !postedBy) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Convert applicationDeadline to a Date object
      const parsedDeadline = new Date(applicationDeadline);
  
      // Handle company image if uploaded
      let companyImage = null;
      if (req.file) {
        companyImage = {
          data: fs.readFileSync(req.file.path), // Read the uploaded file
          contentType: req.file.mimetype, // File type (e.g., image/png)
        };
      }
  
      // Create a new job post object
      const newJob = {
        title,
        company,
        jobUrl,
        companyImage,
        location,
        description,
        qualification,
        applicationDeadline: parsedDeadline, // Save as Date object
        postedBy: {
          userId: parsedUser.userId,
          username: parsedUser.username,
          email: parsedUser.email,
        },
      };
  
      // Save the job post to the database
      const createdJob = await jobmodel.create(newJob);
  
      res.status(201).json({ message: "Job created successfully", job: createdJob });
    } catch (err) {
      console.error("Error creating job:", err);
      res.status(500).json({ message: "Error creating job", error: err.message });
    }
  };
  
  

module.exports = { postjobposts, getjobposts };
