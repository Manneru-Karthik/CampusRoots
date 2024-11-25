import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Jobs.css";

const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch("https://campusroots.onrender.com/alumnitracking/getjobs"); // Update with your API endpoint
        const data = await response.json();
        setJobPosts(data || []); // Ensure it sets an empty array if data is undefined
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header-container">
        <h1>Job Posts</h1>
        <div className="header-buttons">
          <button className="go-back-btn" onClick={() => navigate("/alumni-space")}>
            Go Back
          </button>
          {sessionStorage.getItem('role') !== 'student' && (
  <Link to="/create-job" className="create-job-btn">
    Create Job
  </Link>
)}
        </div>
      </div>
      <div className="job-container">
        {jobPosts.length === 0 ? (
          <p>No job posts found.</p>
        ) : (
          jobPosts.map((job) => (
            <div key={job._id} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Qualification:</strong> {job.qualification}</p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Posted By:</strong> {job.postedBy?.username || "Unknown"} (
                {job.postedBy?.email || "No email"})
              </p>
              {job.companyImage && (
                <img
                  src={`data:${job.companyImage.contentType};base64,${btoa(
                    new Uint8Array(job.companyImage.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt="Company Logo"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
