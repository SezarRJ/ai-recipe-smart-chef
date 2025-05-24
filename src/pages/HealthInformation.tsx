
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HealthInformation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new health tracking page
    navigate("/health-tracking", { replace: true });
  }, [navigate]);

  return null;
};

export default HealthInformation;
