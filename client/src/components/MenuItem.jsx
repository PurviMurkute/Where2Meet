import React from 'react'
import { Link } from 'react-router'

const MenuItem = ({ text, to, onClick, className, hrPosition }) => {
  return (
    <>
    {hrPosition === "top" && <hr className='text-purple-300' />}
    <div className={`px-5 py-5 cursor-pointer ${className}`} onClick={onClick}>
      <Link to={to} className='font-bold text-lg text-purple-600'>{text}</Link>
    </div>
    {hrPosition === "bottom" && <hr className='text-purple-300' />}
    </>
  )
}

export default MenuItem
