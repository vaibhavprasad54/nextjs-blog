"use client"

import {createContext, useContext, useState} from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const updateSession = (updatedSession) => {
    setSession(updatedSession);
  };

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};


export const useSessionContext = () => useContext(SessionContext);