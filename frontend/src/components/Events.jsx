import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // For navigating back

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/alumnitracking/getevents");
        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderEventImage = (eventImage) => {
    if (!eventImage || !eventImage.data || !eventImage.contentType) return null;
    const base64String = btoa(
      new Uint8Array(eventImage.data.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return `data:${eventImage.contentType};base64,${base64String}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header-container">
        <h1>Events</h1>
        <div className="header-buttons">
          
          <button className="go-back-btn" onClick={() => navigate('/alumni-space')}>
            Go Back
          </button>
          {sessionStorage.getItem('role') !== 'student' && (
  <Link to="/create-event" className="create-event-btn">
    Create Event
  </Link>
          )}
        </div>
      </div>
      <div className="event-container">
        {events.length === 0 ? (
          <p>No active events present.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              {event.eventImage && (
                <img
                  src={renderEventImage(event.eventImage)}
                  alt={event.title}
                />
              )}
              <h2>{event.title}</h2>
              <p><strong>Description:</strong> {event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()} at{" "}
                {new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p>
                <strong>Mode:</strong>{" "}
                {event.isOnline
                  ? "Online"
                  : `Offline - Location: ${event.location || "Not specified"}`}
              </p>
              <p>
                <strong>Posted By:</strong>{" "}
                {event.postedBy?.username || "Unknown"} ({event.postedBy?.email || "No email"})
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
