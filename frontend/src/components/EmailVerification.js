import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVerifying = useRef(false);

  useEffect(() => {
    console.log("Component mounted or location changed");

    const verifyEmail = async () => {
      if (isVerifying.current) {
        console.log("Verification already in process");
        return;
      }
      isVerifying.current = true;

      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      console.log("Token:", token);

      try {
        const response = await fetch(`http://localhost:5000/alumnitracking/verify-email?token=${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          console.log("Verification successful:", data);
          navigate("/alumni-login");
        } else {
          console.error("Verification failed:", data.msg);
        }
      } catch (error) {
        console.error("Error during verification:", error);
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return <div>Verifying email...</div>;
};

export default EmailVerification;
