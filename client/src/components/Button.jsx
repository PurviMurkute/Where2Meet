import React from "react";

const Button = ({ btnText, btnSize, variant, onClick }) => {

  const sizeClasses = {
    small: "px-4 py-3 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-10 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <div>
      <button
        className={`${sizeClasses[btnSize]} ${variantClasses[variant]} text-white cursor-pointer rounded-lg font-medium shadow-lg transition`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
