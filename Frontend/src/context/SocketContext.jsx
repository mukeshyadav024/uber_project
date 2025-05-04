import React, { createContext, useEffect} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const socket = io(SOCKET_URL)

const SocketProvider = ({ children }) => {
 
  useEffect(() => {
    
    socket.on("connect", () => {
      console.log("Socket connected to server:");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected from server:");
    });

    // return () => {
    //     socket.disconnect();
    // };

  }, []);

  

  return (
    <SocketContext.Provider value={{ socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;