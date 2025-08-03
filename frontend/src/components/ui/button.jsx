import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
