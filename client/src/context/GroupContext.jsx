import { createContext, useState } from "react";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [groupCode, setGroupCode] = useState(() => {
    const stored = localStorage.getItem("groupCode");
    return stored ? JSON.parse(stored) : null;
  });

  const updateGroup = (code) => {
    setGroupCode(code);
    if (code) {
      localStorage.setItem("groupCode", JSON.stringify(code));
    } else {
      localStorage.removeItem("groupCode");
    }
  };

  return (
    <GroupContext.Provider value={{ groupCode, setGroupCode: updateGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };