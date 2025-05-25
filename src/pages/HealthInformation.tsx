
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HealthInformation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the health tracking page
    navigate("/health-tracking", { replace: true });
  }, [navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wasfah-orange mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Health Tracking...</p>
      </div>
    </div>
  );
};

export default HealthInformation;
