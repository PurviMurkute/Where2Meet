import React, { useContext } from "react";
import Header from "../components/Header";
import HomeImg from "../assets/homeimg.png";
import Button from "../components/Button";
import location from "../assets/location.jpg";
import { useNavigate } from "react-router";
import FeatureCard from "../components/FeatureCard";
import { UserContext } from "../context/UserContext";
import { io } from "socket.io-client";
import Model from "../components/Model";
import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GroupContext } from "../context/GroupContext";
import { useEffect } from "react";

const socket = io.connect(`${import.meta.env.VITE_SERVER_URL}`);

const Home = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isJoinGroupModalOpen, setIsJoinGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const userId = user?._id;

  const { group, setGroup } = useContext(GroupContext);

  const JWT = localStorage.getItem("token");

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/create`,
        {
          groupName,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setGroup(response.data.data);
        setGroupName("");
        setDescription("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create group"
      );
    }
  };

  const handleJoinGroup = async () => {
    try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/join`,
      {
        code: groupCode
      },
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    if(response.data.success){
      toast.success(response.data.message);
      socket.emit("joinGroup", { groupCode, userId })
    }else{
      toast.error(response.data.message);
    }
     } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
      
    }
  };

  return (
    <>
      <Header />

      <div
        name="home"
        className="w-full bg-gradient-to-l from-[#e6e6ff] to-[#ffffff]"
      >
        <div className="md:max-w-7xl flex flex-col md:flex-row items-center justify-between min-h-screen mx-auto px-10 md:px-6 pt-23 md:pt-0 md:mt-0">
          <div className="md:ps-10 max-w-2xl">
            <p className="uppercase text-purple-600 font-semibold tracking-wide mb-2">
              Where2Meet
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Track, <br />
              Discover, <br />
              Go
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Easily find the perfect meeting spot with your friends, share live
              locations, and coordinate in real-time, all in one place.
            </p>
            {user ? (
              <div className="flex gap-4">
                <Button
                  btnText="Create Group"
                  btnSize={"large"}
                  variant="primary"
                  onClick={() => setIsModelOpen(true)}
                />
                <Button
                  btnText="Join Groups"
                  btnSize={"large"}
                  variant="outline"
                  onClick={() => setIsJoinGroupModalOpen(true)}
                />
              </div>
            ) : (
              <Button
                btnText="Start Now"
                btnSize="large"
                variant="primary"
                onClick={() => navigate("/register")}
              />
            )}
          </div>
          <div className="mt-8 md:mt-0 flex justify-center w-[80%] md:w-1/2">
            <img src={HomeImg} alt="Home" className="max-w-md w-full" />
          </div>
        </div>
        <div className="pb-10">
          <img
            src={location}
            alt="location"
            className="w-full h-[250px] md:h-[450px] object-cover opacity-70"
          />
          <h2
            name="features"
            className="text-center text-2xl md:text-3xl font-bold text-black py-10"
          >
            Features of{" "}
            <span className="text-purple-600 ml-2 font-extrabold">
              Where2Meet
            </span>
          </h2>
          <div className="max-w-7xl mx-auto flex justify-evenly items-center flex-wrap text-center md:py-10">
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
      <Model
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
        }}
      >
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-center py-3">
            💭 Give your group a unique name so friends can recognize it.
          </p>
          <Input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <p className="text-center text-green-700 font-bold text-2xl py-3">
          {group?.code || ""}
        </p>
        {group && (
          <p className="text-center text-gray-600 py-2 text-sm">
            Share this code with your friends to join the group.
          </p>
        )}
        <div className="py-3 flex justify-end gap-3 px-5">
          <Button
            btnText={"Next"}
            btnSize={"small"}
            variant="primary"
            onClick={handleCreateGroup}
          />
          <Button
            btnText={"Cancel"}
            btnSize={"small"}
            variant="outline"
            onClick={() => {
              setIsModelOpen(false);
            }}
          />
        </div>
      </Model>
      <Model
        isOpen={isJoinGroupModalOpen}
        onClose={() => {
          setIsJoinGroupModalOpen(false);
        }}
      >
        <div>
          <h2 className="text-center font-bold text-lg">Let's Get You In!</h2>
          <p className="text-gray-600 text-center py-3">
            Type in the secret group code and start finding the perfect spot
            together.
          </p>
          <Input
            type="text"
            placeholder="Group Code"
            value={groupCode}
            onChange={(e) => {
              setGroupCode(e.target.value);
            }}
          />
        </div>
        <div className="py-3 flex justify-end gap-3 px-5">
          <Button
            btnText={"Join"}
            btnSize={"small"}
            variant="primary"
            onClick={handleJoinGroup}
          />
        </div>
      </Model>
      <Toaster />
    </>
  );
};

export default Home;
