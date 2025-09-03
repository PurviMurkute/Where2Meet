import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <div className="flex justify-around items-center py-4 fixed top-0 left-0 w-full">
      <h1 className="text-2xl font-bold">
        <img
          src="/meeticon.png"
          alt="Where2Meet"
          className="inline-block mr-2 w-[50px]"
        />{" "}
        Where2Meet
      </h1>
      <div className="flex gap-8 font-bold ">
        <p>Home</p>
        <p>About</p>
        <p>Services</p>
        <p>Contact</p>
      </div>
      <Button btnText="Get Started" />
    </div>
  );
};

export default Header;
