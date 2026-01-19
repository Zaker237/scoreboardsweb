import React, { createContext, useContext, useEffect, useState } from "react";
import { getDeviceId } from "@/utils/device";
import { NotificationService } from "@/services/NotificationService";
import { WSClient } from "@/services/wsClient";
import { URLs } from "@/constants/urls";

interface DeviceContextValue {
  deviceId: string | null;
  ws: WSClient | null;
  connected: boolean;
}

const DeviceContext = createContext<DeviceContextValue>({
  deviceId: null,
  ws: null,
  connected: false,
});

export const useDevice = () => useContext(DeviceContext);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [wsClient, setWsClient] = useState<WSClient | null>(null);

  useEffect(() => {
    const initializeDeviceId = async () => {
      let currentId = getDeviceId();

      if (!currentId) {
        try {
          currentId = await NotificationService.registerDeviceOnServer();
        } catch (error) {
          console.error("Failed to register device:", error);
        }
      }

      if (currentId) {
        setDeviceId(currentId);
      }
    };

    initializeDeviceId();
  }, []);

  useEffect(() => {
    if (!deviceId) return;

    const client = new WSClient({
      url: URLs.NOTIFICATIONS.WEBSOCKET.replace("$deviceId", deviceId),
      reconnectInterval: 1000,
      maxReconnectInterval: 30000,
      reconnectDecay: 1.5,
      heartbeatInterval: 25000,
      onOpen: () => setConnected(true),
      onClose: () => setConnected(false),
    });

    client.on("message", (msg: any) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("notifications.ws.message", { detail: msg })
        );
      }
    });

    setWsClient(client);

    return () => {
      client.close();
      setConnected(false);
      setWsClient(null);
    };
  }, [deviceId]);

  return (
    <DeviceContext.Provider value={{ deviceId, ws: wsClient, connected }}>
      {children}
    </DeviceContext.Provider>
  );
};
