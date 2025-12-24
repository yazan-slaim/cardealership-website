"use client";

import { ActiveSectionProvider } from "@/contexts/ActiveSection";
import { MenuProvider } from "@/contexts/MenuContext";
export const Provider = ({ children }) => {
  return (
    <MenuProvider>
      <ActiveSectionProvider>{children}</ActiveSectionProvider>
    </MenuProvider>
  );
};
