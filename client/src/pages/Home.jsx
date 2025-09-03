import React from "react";
import Header from "../components/Header";
import HomeImg from "../assets/homeimg.png";
import Button from "../components/Button";

const Home = () => {
  return (
    <>
      <Header />

      <div className="w-full bg-gradient-to-t from-[#e6e6ff] to-[#ffffff]">
        <div className="max-w-7xl flex flex-col md:flex-row items-center justify-between min-h-screen mx-auto px-6">
        <div className="max-w-2xl">
          <p className="uppercase text-purple-600 font-semibold tracking-wide mb-2">
            Where2Meet
          </p>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Track, <br />
            Discover, <br />
            Go
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Easily find the perfect meeting spot with your friends, share live
            locations, and coordinate in real-time, all in one place.
          </p>
          <Button btnText="Start Now" />
        </div>
        <div className="mt-10 md:mt-0 flex justify-center w-full md:w-1/2">
          <img src={HomeImg} alt="Home" className="max-w-md w-full" />
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
