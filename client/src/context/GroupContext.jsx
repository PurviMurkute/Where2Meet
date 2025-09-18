import { createContext, useState } from "react";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState(() => {
    const stored = localStorage.getItem("group");
    return stored ? JSON.parse(stored) : null;
  });

  // Optionally, update localStorage whenever group changes
  const updateGroup = (g) => {
    setGroup(g);
    if (g) {
      localStorage.setItem("group", JSON.stringify(g));
    } else {
      localStorage.removeItem("group");
    }
  };

  return (
    <GroupContext.Provider value={{ group, setGroup: updateGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };