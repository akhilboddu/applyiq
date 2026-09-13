// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
// Socket.IO attaches at the origin, not under /api — take it from the same
// constant api.js builds its baseURL from, so the two can never drift.
import { API_ORIGIN } from "../lib/api.js";

const SocketContext = createContext(null);

const MAX_NOTIFICATIONS = 10;

export function SocketProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = io(API_ORIGIN, { auth: { token } });

    socket.on("application:statusChanged", (payload) => {
      setNotifications((current) =>
        [{ ...payload, read: false }, ...current].slice(0, MAX_NOTIFICATIONS),
      );
      // Refresh the list itself, not just the bell — another tab that moved
      // the card should see this tab's board catch up.
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    });

    // StrictMode mounts effects twice in dev. Without this the first socket
    // is never closed and every notification arrives twice.
    return () => socket.disconnect();
  }, [queryClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((current) => current.map((n) => ({ ...n, read: true })));

  return (
    <SocketContext.Provider
      value={{ notifications, unreadCount, markAllRead }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used inside a SocketProvider");
  }
  return context;
}
