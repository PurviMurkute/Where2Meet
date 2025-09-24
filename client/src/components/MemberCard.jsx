import React from "react";
import { MdLocationOn } from "react-icons/md";
import { MdLocationOff } from "react-icons/md";

const MemberCard = ({member, isLocationSharing}) => {
  return (
    <div className="flex justify-between items-center bg-white border-1 border-purple-600 rounded-md px-7 py-4">
    <div className="flex flex-col">
      <h5 className="font-bold text-md text-purple-700">{member.username}</h5>
      <p className="text-sm text-gray-600">{member.email}</p>
    </div>
    <div>
      {isLocationSharing? <MdLocationOn className="text-green-600 text-4xl animate-pulse" /> : <MdLocationOff className="text-red-600 text-4xl" />}
    </div>
    </div>
  );
};

export default MemberCard;
