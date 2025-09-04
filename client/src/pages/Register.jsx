import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen bg-gradient-to-l from-[#e6e6ff] to-[#ffffff] flex items-center justify-center">
        <div className="flex w-[900px] bg-white rounded-xl shadow-2xl mt-20 overflow-hidden">
          <div className="w-1/2 bg-purple-600 flex flex-col items-center justify-center text-white p-10">
            <h1 className="text-3xl font-bold mb-4">Join Us Today!"</h1>
            <p className="text-center mb-6">
              Unlock personalized features designed to make meeting easier than
              ever.
            </p>
            <p className="text-white font-medium pb-4">
              Already have an account?
            </p>
            <Button
              btnText={"Login"}
              variant="light_outline"
              onClick={() => navigate("/login")}
            />
          </div>

          <div className="w-1/2 flex flex-col justify-center items-center p-10">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col justify-center items-center gap-2 w-full"
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

              <div className="flex items-center w-full my-2">
                <div className="h-[1px] flex-1 bg-gray-300" />
                <span className="mx-3 text-sm text-gray-500">OR</span>
                <div className="h-[1px] flex-1 bg-gray-300" />
              </div>

              <Button
                btnText="Continue with Google"
                btnSize="full_width"
                variant="outline"
                btnIcon={"google"}
                iconPosition={"left"}
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_SERVER_URL}/auth/google`,
                    "_self"
                  )
                }
              />
            </form>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default Register;
