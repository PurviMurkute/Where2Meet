import React from 'react'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="border-1 border-purple-700 p-2 m-2 rounded-md shadow-md w-[90%] focus:outline-none" />
  )
}

export default Input
