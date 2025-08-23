import React from "react";

const StatusBadge = ({ status }) => {
  // Only show badge for "Vendido" and "Apartado"
  if (status === "Disponible") {
    return null;
  }

  // Determine the color class based on status
  const getColorClass = () => {
    switch (status) {
      case "Vendido":
        return "status-badge-red";
      case "Apartado":
        return "status-badge-yellow";
      default:
        return "status-badge-red";
    }
  };

  return (
    <div className={`status-badge ${getColorClass()}`}>
      <span className="status-badge-text">{status}</span>
    </div>
  );
};

export default StatusBadge;
