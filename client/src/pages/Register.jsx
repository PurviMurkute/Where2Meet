import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        {
          username: user.username,
          email: user.email,
          password: user.password,
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setUser({
          username: "",
          email: "",
          password: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong! please try again."
      );
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-l from-[#e6e6ff] to-[#ffffff] pt-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col justify-center items-center mt-10 gap-2 w-[450px] mx-auto bg-white p-10 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <Input
            type="text"
            placeholder="Name"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            btnText="Register"
            btnSize="full_width"
            variant="primary"
            onClick={registerUser}
          />
          <div className="flex items-center w-[90%] my-2">
            <div className="h-[1px] flex-1 bg-gray-500" />
            <span className="mx-3 text-sm text-gray-500">OR</span>
            <div className="h-[1px] flex-1 bg-gray-500" />
          </div>
          <Button
            btnText="Continue with Google"
            btnSize="full_width"
            variant="outline"
            btnIcon={"google"}
            iconPosition={"left"}
            onClick={() => {window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self")}}
          />
          <p className=" text-gray-600">Already have an account? <a href="/login" className="text-blue-700">Login</a></p>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
