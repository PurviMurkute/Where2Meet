import React from "react";
import Header from "../components/Header";
import HomeImg from "../assets/homeimg.png";
import Button from "../components/Button";
import location from "../assets/location.jpg";
import { useNavigate } from "react-router";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      <div className="w-full bg-gradient-to-l from-[#e6e6ff] to-[#ffffff]">
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
            <Button
              btnText="Start Now"
              btnSize="large"
              variant="primary"
              onClick={() => navigate("/register")}
            />
          </div>
          <div className="mt-10 md:mt-0 flex justify-center w-full md:w-1/2">
            <img src={HomeImg} alt="Home" className="max-w-md w-full" />
          </div>
        </div>
        <div className="py-10">
          <img
            src={location}
            alt="location"
            className="w-full h-[500px] object-cover opacity-60"
          />
          <h2 className="text-center text-2xl md:text-3xl font-bold text-black py-10">
            Features of{" "}
            <span className="text-purple-600 ml-2 font-extrabold">
              Where2Meet
            </span>
          </h2>
          <div className="max-w-7xl mx-auto flex justify-evenly items-center flex-wrap text-center py-10">
            <FeatureCard
              title={"Real-time location sharing"}
              description={"See where your friends are instantly in Real-time."}
              icon={"location"}
            />
            <FeatureCard
              title={"Smart midpoint calculation"}
              description={
                "Find the best meeting point between you and your friends."
              }
              icon={"display"}
            />
            <FeatureCard
              title={"Privacy control"}
              description={
                "You choose when and with whom to share your location."
              }
              icon={"privacy"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
