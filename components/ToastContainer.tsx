"use client";

import { useEffect, useState, FC } from "react";
import { NotificationPayload } from "@/contexts/NotificationsContext";

type ToastItem = NotificationPayload & { __id: string };

const TOAST_TIME_MS = 6000;

export const ToastContainer: FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (ev: CustomEvent<NotificationPayload>) => {
      const payload = ev.detail;
      const __id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const item = { ...payload, __id };

      setToasts((prev) => [item, ...prev]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.__id !== __id));
      }, TOAST_TIME_MS);
    };

    window.addEventListener("notifications.add", handler as EventListener);

    return () =>
      window.removeEventListener("notifications.add", handler as EventListener);
  }, []);

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        top: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 360,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.__id}
          style={{
            background: "white",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            padding: "12px 14px",
            borderRadius: 8,
            borderLeft: "4px solid #2563EB",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {t.title ?? "Notification"}
          </div>
          <div style={{ fontSize: 13 }}>{t.message}</div>
        </div>
      ))}
    </div>
  );
};
