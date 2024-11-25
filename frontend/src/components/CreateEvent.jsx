import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    isOnline: false,
    location: "",
  });

  const [eventImage, setEventImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Cast checkbox value to boolean
    });
  };

  const handleImageChange = (e) => {
    setEventImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventImage) {
      setError("Event image is required.");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("isOnline", formData.isOnline); // Append as boolean
    if (!formData.isOnline) {
      data.append("location", formData.location);
    }
    data.append("eventImage", eventImage);
    data.append(
      "postedBy",
      JSON.stringify({
        userId: user._id,
        username: user.username,
        email: user.gmail,
      })
    );

    try {
      const response = await fetch("https://campusroots.onrender.com/alumnitracking/postevents", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        navigate("/events");
      } else {
        console.error("Failed to create event");
        setError("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="create-event-page">
      <form onSubmit={handleSubmit}>
        <h2>Create Event</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Event Image:
          <input
            type="file"
            name="eventImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Online Event:
          <input
            type="checkbox"
            name="isOnline"
            checked={formData.isOnline}
            onChange={handleChange}
          />
        </label>
        {!formData.isOnline && (
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
