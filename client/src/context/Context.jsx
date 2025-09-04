import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLS = localStorage.getItem("currentUser");
    const JWT = localStorage.getItem("token");

    if (userFromLS && JWT) {
      setUser(JSON.parse(userFromLS));
    }
  }, []);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };