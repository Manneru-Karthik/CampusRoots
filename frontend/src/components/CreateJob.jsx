import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css";

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    jobUrl: "",
    location: "",
    description: "",
    qualification: "",
    applicationDeadline: "",
  });

  const [companyImage, setCompanyImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setCompanyImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));

    const data = new FormData();
    data.append("title", formData.title);
    data.append("company", formData.company);
    data.append("jobUrl", formData.jobUrl);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("qualification", formData.qualification);
    data.append("applicationDeadline", formData.applicationDeadline);

    if (companyImage) {
      data.append("companyImage", companyImage);
    }

    // Ensure postedBy contains correct user information
    data.append("postedBy", JSON.stringify({
      userId: user._id, 
      username: user.username, 
      email: user.gmail
    }));

    try {
      const response = await fetch("http://localhost:5000/alumnitracking/postjobs", {
        method: "POST",
        body: data, // No need to set Content-Type with FormData
      });

      if (response.ok) {
        navigate("/jobs");
      } else {
        console.error("Failed to create job");
      }
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  



  return (
    <div className="create-job-page">
      <form onSubmit={handleSubmit}>
        <h2>Create Job</h2>
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
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Job URL:
          <input
            type="text"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Company Image:
          <input
            type="file"
            name="companyImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
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
        <label>
          Job Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Qualification:
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Application Deadline:
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
