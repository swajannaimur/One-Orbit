"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Ably from "ably";

const AblyContext = createContext(null);
const CurrentUserContext = createContext(null);

export const AblyProvider = ({ children }) => {
  const [ablyRealtime, setAblyRealtime] = useState(null);
  const [clientId, setClientId] = useState("");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (!clientId) return;

    let realtime = null;
    let cancelled = false;

    const init = async () => {
      try {
        // Use authUrl, not manual fetch — Ably handles token refresh automatically
        realtime = new Ably.Realtime({
          authUrl: "/api/ably/token?clientId=" + clientId,
          echoMessages: false, // optional
        });

        realtime.connection.once("connected", () => {
          console.log("✅ Ably connected");
          if (!cancelled) setAblyRealtime(realtime);
        });

        realtime.connection.on("failed", (err) => {
          console.error("❌ Ably connection failed");
        });
      } catch (err) {
        console.error("Failed to initialize Ably:", err);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (realtime) {
        try {
          realtime.close();
          console.log("🔌 Ably connection closed");
        } catch (e) {}
      }
      setAblyRealtime(null);
    };
  }, [clientId]);

  return (
    <AblyContext.Provider value={ablyRealtime}>
      <CurrentUserContext.Provider
        value={{ clientId, setClientId, usersList, setUsersList }}
      >
        {children}
      </CurrentUserContext.Provider>
    </AblyContext.Provider>
  );
};

export const useAbly = () => useContext(AblyContext);
export const useCurrentUser = () => useContext(CurrentUserContext);
