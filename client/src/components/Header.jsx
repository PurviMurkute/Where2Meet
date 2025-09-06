import React, { useContext } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { Link as ScrollLink } from "react-scroll";
import { UserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const isHomePage = window.location.pathname === "/";

  const { user, setUser } = useContext(UserContext);

  return (
    <div
      className={`flex items-center fixed top-0 py-2 shadow-sm bg-white z-10 ${
        isHomePage
          ? "w-full justify-between px-2 md:px-0 md:justify-around"
          : "md:w-2/3 md:mx-62 justify-between my-1 px-4 md:px-9 rounded-full"
      }`}
    >
      <h1 className="text-xl md:text-2xl font-bold flex justify-center items-center">
        <img
          src="/meeticon.png"
          alt="Where2Meet"
          className="inline-block mr-2 w-[35px] md:w-[45px] cursor-pointer"
          onClick={() => navigate("/")}
        />{" "}
        Where2Meet
      </h1>
      <div className="flex justify-center items-center gap-8 font-bold text-gray-600">
        {isHomePage && (
          <div className="hidden md:flex md:gap-8">
            <ScrollLink
              to="home"
              smooth={true}
              duration={300}
              className="cursor-pointer hover:text-purple-600 hover:scale-95 transition-all transform"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={300}
              className="cursor-pointer hover:text-purple-600 hover:scale-95 transition-all transform"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              duration={300}
              className="cursor-pointer hover:text-purple-600 hover:scale-95 transition-all transform"
            >
              FAQ
            </ScrollLink>
            <ScrollLink
              to="support"
              smooth={true}
              duration={300}
              className="cursor-pointer hover:text-purple-600 hover:scale-95 transition-all transform"
            >
              Support
            </ScrollLink>
          </div>
        )}
        {user ? (
          <>
            <Button
              btnText={"Logout"}
              btnSize={"small"}
              variant={"outline"}
              btnIcon={"arrow"}
              iconPosition={"right"}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
                toast.success("Logged out successfully");
                setUser(null);
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }}
            />
            <Button
              btnText={"My Groups"}
              btnSize={"small"}
              variant={"primary"}
              onClick={() => {
                navigate("/groups");
              }}
            />
          </>
        ) : (
          <Button
            btnText="Get Started"
            btnSize="small"
            variant="primary"
            btnIcon={"arrow"}
            onClick={() => navigate("/register")}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
