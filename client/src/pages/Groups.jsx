import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import GroupCard from "../components/GroupCard";

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
            const { _id, groupName, description } = group;
              return (
                <GroupCard key={_id} groupName={groupName} description={description} />
              );
            })}
      </div>
      <Toaster />
    </div>
  );
};

export default Groups;
