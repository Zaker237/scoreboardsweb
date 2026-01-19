import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { URLs } from "@/constants/urls";
import { getDeviceId } from "@/utils/device";

export interface NotificationPayload {
  id?: string;
  title: string;
  message: string;
  created_at?: string;
  type?: string;
}

interface NotificationContextType {
  notifications: NotificationPayload[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectWebSocket();

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const connectWebSocket = () => {
    const deviceId = getDeviceId();
    if (deviceId) {
      wsRef.current = new WebSocket(
        URLs.NOTIFICATIONS.WEBSOCKET.replace("$deviceId", deviceId)
      );

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
      };

      wsRef.current.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          setNotifications((prev) => [...prev, data]);
        } catch (err) {
          console.error("Invalid WS notification data:", err);
        }
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket disconnected… reconnecting");
        setTimeout(connectWebSocket, 2000);
      };

      wsRef.current.onerror = (err) => {
        console.error("WebSocket error", err);
        wsRef.current?.close();
      };
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  return context;
};
