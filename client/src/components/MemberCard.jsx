import React from "react";

const MemberCard = ({member}) => {
  return (
    <div className="flex flex-col bg-white border-1 border-purple-600 rounded-md px-7 py-4">
      <h5 className="font-bold text-md text-purple-700">{member.username}</h5>
      <p className="text-sm text-gray-600">{member.email}</p>
    </div>
  );
};

export default MemberCard;
