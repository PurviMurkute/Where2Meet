import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdSmartDisplay } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";

const FeatureCard = ({ title, description, icon }) => {
    const icons = {
        location: <FaLocationDot className="text-purple-600 w-10 h-10 mx-auto" />,
        display: <MdSmartDisplay className="text-purple-600 w-10 h-10 mx-auto" />,
        privacy: <MdPrivacyTip className="text-purple-600 w-10 h-10 mx-auto" />,
    }
  return (
    <div className="w-[380px] hover:bg-purple-300 py-4 px-8 rounded-lg transition duration-200">
        {icon && <div className="mb-4">{icons[icon]}</div>}
      <h4 className="font-bold text-[18px]">{title}</h4>
      <p className="text-[15px]">{description}</p>
    </div>
  )
}

export default FeatureCard
