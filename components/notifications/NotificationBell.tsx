import { useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";

const NotificationBell: React.FC = () => {
  const { notifications } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>
        🔔 ({notifications.length})
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            width: "280px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            padding: "10px",
            zIndex: 10,
          }}
        >
          {notifications.length === 0 && <p>No notifications</p>}

          {notifications.map((n, index) => (
            <div
              key={n.id ?? index}
              style={{
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{n.title}</strong>
              <p style={{ fontSize: "0.85rem", margin: 0 }}>{n.message}</p>
              <small style={{ opacity: 0.6 }}>
                {n.created_at ? new Date(n.created_at).toLocaleString() : ""}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
