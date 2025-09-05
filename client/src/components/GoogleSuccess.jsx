import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const GoogleSuccess = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/auth/current-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem("currentUser", JSON.stringify(res.data.data));
            toast.success("Login Successful");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        } catch (error) {
          console.log("error in googlesuccess", error);

          toast.error(error?.message);
        }
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center h-screen space-y-4 bg-gradient-to-l from-[#afaff0] to-[#ffffff]">
      <Loader className="w-8 h-8 animate-spin" />
      <p className="font-medium">Logging you in...</p>
      <Toaster />
    </div>
  );
};

export default GoogleSuccess;