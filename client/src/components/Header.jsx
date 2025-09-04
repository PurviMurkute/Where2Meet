import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-around items-center py-2 fixed top-0 left-0 w-full shadow-sm bg-white z-10">
      <h1 className="text-2xl font-bold flex justify-center items-center">
        <img
          src="/meeticon.png"
          alt="Where2Meet"
          className="inline-block mr-2 w-[50px]"
        />{" "}
        Where2Meet
      </h1>
      <div className="flex justify-center items-center gap-8 font-bold text-gray-600">
        <p>Home</p>
        <p>About</p>
        <p>Services</p>
        <p>Contact</p>
        <Button btnText="Get Started" btnSize="small" variant="primary" onClick={() => navigate("/register")} />
      </div>
    </div>
  );
};

export default Header;
