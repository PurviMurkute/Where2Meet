import React from "react";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

const Button = ({ btnText, btnSize, variant, btnIcon, iconPosition, onClick }) => {

  const sizeClasses = {
    small: "px-2 md:px-5 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 md:px-10 py-2 md:py-3 text-lg",
    full_width: "w-[90%] py-2 my-3 text-base",
  };

  const variantClasses = {
    primary: "bg-purple-600 rounded-lg text-white hover:bg-purple-700",
    secondary: "bg-gray-600 rounded-lg text-white hover:bg-gray-700",
    outline: "border-1 border-purple-600 rounded-lg text-purple-700 hover:bg-purple-600 hover:text-white",
    light_outline: "border border-white px-8 py-2 rounded-full hover:bg-white hover:text-purple-700 transition"
  };

  const icons = {
    arrow: <HiMiniArrowRightStartOnRectangle className="inline-block w-5 h-5" />,
    google: <FcGoogle className="inline-block w-7 h-7" />,
  }

  return (
    <button
      className={`${sizeClasses[btnSize]} ${variantClasses[variant]} flex justify-center items-center cursor-pointer font-medium shadow-lg transition`}
      onClick={onClick}
    >
      {btnIcon && iconPosition === "left" && <span className="mr-2">{icons[btnIcon]}</span>}
      {btnText}
      {btnIcon && (!iconPosition || iconPosition === "right") && <span className="ml-2">{icons[btnIcon]}</span>}
    </button>
  );
};

export default Button;