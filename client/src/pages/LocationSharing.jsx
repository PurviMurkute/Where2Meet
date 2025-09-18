import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { io } from "socket.io-client";
import axios from "axios";
import { GroupContext } from "../context/GroupContext";
import { UserContext } from "../context/UserContext";

const socket = io.connect(`${import.meta.env.VITE_SERVER_URL}`);

const containerStyle = {
  width: "100%",
  height: "600px",
};

const LocationSharing = () => {
  const { group } = useContext(GroupContext);
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setMyLocation(location);

      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-location`,
        location,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      socket.emit("shareLocation", {
        groupCode: group.code,
        userId: user?._id,
        location,
      });
    });
  }, [group, user]);

  useEffect(() => {
    if (!group || !user) return;

    socket.on("groupLocations", (locations) => {
      setMembers(locations);
    });

    const fetchGroupLocations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/group-location/${
            group?.code
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMembers(res.data.data);
      } catch (error) {
        console.error("Error fetching group locations:", err);
      }
    };
    fetchGroupLocations();

    return () => {
      socket.off("groupLocations");
    };
  }, [group, user]);

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
              label={member?.username}
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
