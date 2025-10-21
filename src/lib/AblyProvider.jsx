"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Ably from "ably";

const AblyContext = createContext(null);
const CurrentUserContext = createContext(null);

export const AblyProvider = ({ children }) => {
  const [ablyRealtime, setAblyRealtime] = useState(null);
  const [clientId, setClientId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!clientId) return;

    let realtime = null;
    let cancelled = false;

    const init = async () => {
      try {
        realtime = new Ably.Realtime({
          authUrl: "/api/ably/token?clientId=" + clientId,
          echoMessages: false,
        });

        realtime.connection.once("connected", async () => {
          console.log("✅ Ably connected");
          if (cancelled) return;
          setAblyRealtime(realtime);

          const presenceChannel = realtime.channels.get("presence:global");
          await presenceChannel.attach();
          await presenceChannel.presence.enter({ clientId });

          const updateOnlineUsers = async () => {
            const members = await presenceChannel.presence.get({
              waitForSync: true,
            });
            const ids = members.map((m) => m.clientId);
            setOnlineUsers(ids);
          };

          presenceChannel.presence.subscribe("enter", updateOnlineUsers);
          presenceChannel.presence.subscribe("leave", updateOnlineUsers);
          presenceChannel.presence.subscribe("update", updateOnlineUsers);

          await updateOnlineUsers();
        });

        realtime.connection.on("failed", (err) => {
          console.error("❌ Ably connection failed", err);
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
          const presenceChannel = realtime.channels.get("presence:global");
          presenceChannel.presence.leave();
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
        value={{ clientId, setClientId, usersList, setUsersList, onlineUsers }}
      >
        {children}
      </CurrentUserContext.Provider>
    </AblyContext.Provider>
  );
};

export const useAbly = () => useContext(AblyContext);
export const useCurrentUser = () => useContext(CurrentUserContext);
