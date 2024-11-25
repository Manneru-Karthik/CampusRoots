const fs = require("fs");
const eventModel = require("../models/Eventmodel");



const getevent = async (req, res) => {

    try {
      // Fetch all events from the eventModel
      const events = await eventModel.find();
  
      // Send the retrieved events as a response
      res.status(200).json(events);
    } catch (err) {
      console.error("Error fetching events:", err);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  };

const postevent = async (req, res) => {
    console.log(req.body);
    try {
      const {
        title,
        description,
        date,
        time,
        isOnline,
        location,
        postedBy // Extract createdBy as a string
      } = req.body;
  
      // Parse the createdBy field (it should be a JSON string)
      const parsedUser = JSON.parse(req.body.postedBy);
  
      // Validate required fields
      if (
        !title ||
        !description ||
        !date ||
        !time ||
        !postedBy
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Check if the event is not online, then location is required
      if (!isOnline && !location) {
        return res.status(400).json({ message: "Location is required for offline events" });
      }
  
      // Convert date and time to a Date object
      const eventDateTime = new Date(`${date}T${time}`);
  
      // Handle event image if uploaded
      let eventImage = null;
      if (req.file) {
        eventImage = {
          data: fs.readFileSync(req.file.path),
          contentType: req.file.mimetype,
        };
      } else {
        return res.status(400).json({ message: "Event image is required" });
      }
      const isOnlineBool = isOnline === "true" || isOnline === true;

      // Create a new event object
      const newEvent = {
        title,
        description,
        date: eventDateTime,
        time,
        isOnline,
        location: isOnlineBool ? null : location, // Set location to null if online
        eventImage,
        postedBy: {
          userId: parsedUser.userId,
          username: parsedUser.username,
          email: parsedUser.email,
        },
      };
  
      // Save the event to the database
      const createdEvent = await eventModel.create(newEvent);
  
      res.status(201).json({ message: "Event created successfully", event: createdEvent });
    } catch (err) {
      console.error("Error creating event:", err);
      res.status(500).json({ message: "Error creating event", error: err.message });
    }
  };
  

module.exports = { postevent,getevent};
