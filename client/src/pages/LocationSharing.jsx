import React, { useEffect, useState, useContext, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import { GroupContext } from "../context/GroupContext";
import { UserContext } from "../context/UserContext";
import { io } from "socket.io-client";
import Header from "../components/Header";
import Button from "../components/Button";
import MemberCard from "../components/MemberCard";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LocationSharing = () => {
  const { groupCode } = useContext(GroupContext);
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [category, setCategory] = useState("Cafe");
  const [places, setPlaces] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Location");

  // UseRef to store socket so we don't reconnect on every render
  const socketRef = useRef(null);

  useEffect(() => {
    if (!groupCode || !user) return;

    // Connect socket only once when page loads
    socketRef.current = io(import.meta.env.VITE_SERVER_URL);

    // Join group room immediately after socket connects
    socketRef.current.emit("joinGroup", { groupCode, userId: user._id });

    // Listen for live location updates
    socketRef.current.on("groupLocations", (locations) => {
      setMyLocation(locations);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [groupCode, user]);

  // Get user's current location and send to backend + socket
  useEffect(() => {
    if (!navigator.geolocation || !groupCode || !user) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setMyLocation(location);

      // Save location in DB
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/update-location`,
        location,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Emit location to group via socket
      socketRef.current.emit("shareLocation", {
        groupCode,
        userId: user._id,
        location,
      });
    });
  }, [groupCode, user]);

  // Load initial group members from backend (in case someone shared location earlier)
  useEffect(() => {
    const fetchGroupLocations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/group-location/${groupCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMembers(res.data.data);
      } catch (error) {
        console.error("Error fetching group locations:", error);
      }
    };
    if (groupCode) fetchGroupLocations();
  }, [groupCode]);

  const getPlaces = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/places/${groupCode}`,
        { category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);

      if (response.data.success) {
        setPlaces(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API}`,
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-[250px] border-r-1 border-purple-300">
        <Sidebar
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      {selectedMenu === "Location" ? (
        <div className="w-full space-y-5 relative">
          <Button btnText={"Check Places"} btnSize={"medium"} variant={"secondary"} btnIcon={"arrow"} iconPosition={"right"} className="absolute top-2 z-10 left-[42%]" onClick={getPlaces}  />
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                myLocation
                  ? { lat: myLocation.latitude, lng: myLocation.longitude }
                  : { lat: 20.5937, lng: 78.9629 }
              }
              zoom={12}
            >
              {members.map((member) => (
                <Marker
                  key={member.userId}
                  position={{
                    lat: Number(member.location?.latitude),
                    lng: Number(member.location?.longitude),
                  }}
                  label={member.username}
                />
              ))}
              {places.map((p, i) => (
                <Marker
                  key={i}
                  position={{
                    lat: Number(p.geometry?.location?.lat),
                    lng: Number(p.geometry?.location?.lng),
                  }}
                  label={p.name}
                />
              ))}
            </GoogleMap>
          ) : (
            <>Loading...</>
          )}
        </div>
      ) : selectedMenu === "Group Members" ? (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#e6e6ff] to-[#ffffff] px-20 py-10 overflow-y-scroll scrollbar-hide">
          <h3 className="font-bold pb-4 pt-2 text-gray-600">Group Members</h3>
          {members.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      ) : (
        <div>Places</div>
      )}
    </div>
  );
};

export default LocationSharing;
