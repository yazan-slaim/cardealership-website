// context/CursorContext.js
import { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorSize, setCursorSize] = useState("small");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const expandCursor = () => setCursorSize("large");
  const shrinkCursor = () => setCursorSize("small");

  const moveCursor = (x, y) => setPosition({ x, y });

  return (
    <CursorContext.Provider
      value={{ cursorSize, expandCursor, shrinkCursor, moveCursor, position }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
