import React, { createContext, useContext, useState } from "react";

const ActiveSectionContext = createContext();

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}

export const ActiveSectionProvider = ({ children }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  return (
    <ActiveSectionContext.Provider
      value={{ currentSectionIndex, setCurrentSectionIndex }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
};
