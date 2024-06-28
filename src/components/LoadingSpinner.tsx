import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <img src="/favicon.ico" alt="Loading..." className="spinner-icon" />
    </div>
  );
};

export default LoadingSpinner;
