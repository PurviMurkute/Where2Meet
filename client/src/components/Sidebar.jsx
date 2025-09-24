import React, { useState } from 'react'
import MenuItem from './MenuItem'
import { useNavigate } from 'react-router'

const Sidebar = ({selectedMenu, setSelectedMenu}) => {

    const navigate = useNavigate();
    
  return (
    <div className='fixed w-[209px] min-h-screen'>
      <h1 className="text-lg md:text-xl px-4 py-2 font-bold flex justify-center items-center">
        <img
          src="/meeticon.png"
          alt="Where2Meet"
          className="inline-block mr-2 w-[30px] md:w-[40px] cursor-pointer"
          onClick={() => navigate("/")}
        />{" "}
        Where2Meet
      </h1>
      <hr className='text-purple-400 mt-2' />
      <div className="flex flex-col justify-between h-screen pb-17">
  <div>
    {["Location", "Group Members", "Places", "Quick Actions"].map((tab, i) => (
      <MenuItem
        text={tab}
        key={i}
        onClick={() => setSelectedMenu(tab)}
        hrPosition={"bottom"}
        className={`${
          selectedMenu === tab ? "bg-purple-100" : "bg-white"
        }`}
      />
    ))}
  </div>

  <div>
    <MenuItem text={"LogOut"} hrPosition={"top"} />
  </div>
</div>

    </div>
  )
}

export default Sidebar
