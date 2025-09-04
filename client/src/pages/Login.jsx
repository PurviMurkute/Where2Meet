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
      <div className="min-h-screen bg-gradient-to-l from-[#e6e6ff] to-[#ffffff] flex items-center justify-center">
        <div className="flex w-[900px] bg-white rounded-xl shadow-2xl mt-15 overflow-hidden">
          <div className="w-1/2 flex flex-col justify-center items-center px-10 py-15">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col justify-center items-center gap-2 w-full"
            >
              <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
              <Input
                type="email"
                placeholder="Email"
                value={loginUser.email}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, email: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
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
                onClick={() => {
                  window.open(
                    `${import.meta.env.VITE_SERVER_URL}/auth/google`,
                    "_self"
                  );
                }}
              />
            </form>
          </div>
          <div className="w-1/2 bg-purple-600 flex flex-col items-center justify-center text-white px-10 py-15">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-center mb-6">
              We're glad to see you again. Please login to your account.
            </p>
            <p className="text-white font-medium pb-4">
              Don't have an account?
            </p>
            <Button
              btnText={"Register"}
              variant="light_outline"
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
