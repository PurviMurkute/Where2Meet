import { createContext, useState } from "react";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState(null);

  return (
    <GroupContext.Provider value={{ group, setGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };