import React from "react";
import img1 from "../assets/img1.jpg";
import { IoPeopleSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const GroupCard = ({ groupName, description }) => {
  return (
    <div className="m-2 shadow-sm rounded-xl bg-white w-[350px] h-[300px] flex flex-col">
      <div className="relative">
        <img
          src={img1}
          alt="bg-img"
          className="w-full h-[120px] object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-white/20 flex flex-col justify-end p-5 text-white rounded">
          <h2 className="text-2xl font-bold">{groupName}</h2>
          <p className="text-sm">{description}</p>
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
};

export default GroupCard;
