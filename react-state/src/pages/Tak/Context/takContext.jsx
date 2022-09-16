import { createContext, useContext, useState } from "react";

export const TakContext = createContext();

export const TakProvider = ({ children }) => {
  const [takContextValue, setTakContextValue] = useState("");
  return (
    <TakContext.Provider value={{ takContextValue, setTakContextValue }}>
      {children}
    </TakContext.Provider>
  );
};
/**
 * TakContext debe usarse dentro del TakProvider
 */
export const useTakContext = () => {
  const context = useContext(TakContext);
  if (context === undefined) {
    throw new Error("TakContext must be used within a TakProvider");
  }
  return context;
};
