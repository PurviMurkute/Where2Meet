import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import img1 from "../assets/img1.jpg";
import { IoPeopleSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const Groups = () => {

  const [userGroups, setUserGroups] = useState([]);

  const JWT = localStorage.getItem("token");

  const getGroups = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/groups`,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (response.data.success) {
        setUserGroups(response.data.data);

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch groups"
      );
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d5d5f8] to-[#ffffff] flex items-center justify-center">
      <Header />
      <div className="flex flex-wrap justify-evenly mx-5 mt-20">
        {userGroups.length === 0
          ? "No groups joined yet"
          : userGroups.map((group) => {
              return (
                <div
                  key={group._id}
                  className="m-2 shadow-sm rounded-xl bg-white w-[350px] h-[300px] flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={img1}
                      alt="bg-img"
                      className="w-full h-[120px] object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-white/20 flex flex-col justify-end p-5 text-white rounded">
                      <h2 className="text-2xl font-bold">{group.groupName}</h2>
                      <p className="text-sm">{group.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end gap-2 mt-auto pb-2">
                    <hr className="h-[1px] w-full" />
                    <div className="flex gap-5 px-4 py-1">
                      <FiMenu className="w-5 h-5 text-gray-500" />
                      <IoPeopleSharp className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <Toaster />
    </div>
  );
};

export default Groups;
