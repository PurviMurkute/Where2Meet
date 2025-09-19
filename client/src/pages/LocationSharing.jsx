import React, { useEffect, useState, useContext, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import { GroupContext } from "../context/GroupContext";
import { UserContext } from "../context/UserContext";
import { io } from "socket.io-client";

const containerStyle = {
  width: "100%",
  height: "650px",
};

const LocationSharing = () => {
  const { groupCode } = useContext(GroupContext);
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [myLocation, setMyLocation] = useState(null);

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
      setMembers(locations);
    });

    return () => {
      // Cleanup: disconnect socket when leaving page
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
        `${import.meta.env.VITE_SERVER_URL}/auth/update-location`,
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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API}`,
  });

  return (
    <div className="flex justify-center items-center">
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
                lat: member.location.latitude,
                lng: member.location.longitude,
              }}
              label={member.username}
            />
          ))}
        </GoogleMap>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default LocationSharing;