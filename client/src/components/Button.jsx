import React from "react";

const Button = ({ btnText }) => {
  return (
    <div>
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition">
        {btnText}
      </button>
    </div>
  );
};

export default Button;
