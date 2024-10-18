import React, { useEffect, useState } from "react";
import "../assets/css/Loading.css";
import progress from "../assets/svg/circularprogresswhite.svg";

const Loading = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <div
      className={`loading-container fixed inset-0 flex items-center justify-center z-50 ${
  isVisible ? "visible" : "invisible"
}`}
      style={{
        background: "rgba(0, 0, 0, 0.5)", // Darker background for better visibility
        backdropFilter: "blur(4px)", // Increased blur effect for the background
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div className="loading-content p-4 rounded-2xl">
        <img src={progress} alt="Loading..." className="w-24 h-24 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
