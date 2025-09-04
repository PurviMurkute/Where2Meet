import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { UserContext } from "../context/Context";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const Login = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          email: loginUser.email,
          password: loginUser.password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setLoginUser({
          email: "",
          password: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed"
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
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <Input
            type="email"
            placeholder="Email"
            value={loginUser.email}
            onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
          />
          <Button
            btnText="Login"
            btnSize="full_width"
            variant="primary"
            onClick={Login}
          />
          <div className="flex items-center w-[90%] my-2">
            <div className="h-[1px] flex-1 bg-gray-500" />
            <span className="mx-3 text-sm text-gray-500">OR</span>
            <div className="h-[1px] flex-1 bg-gray-500" />
          </div>
          <Button
            btnText="Login with Google"
            btnSize="full_width"
            variant="outline"
            btnIcon={"google"}
            iconPosition={"left"}
            onClick={() => {window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self")}}
          />
          <p className="text-gray-600">Don't have an account? <a href="/register" className="text-blue-700">Register</a></p>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
