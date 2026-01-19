import { BrowserEmitter } from "@/utils/BrowserEmitter";

export type WSMessage = any;

export interface WSClientOptions {
  url: string;
  protocols?: string | string[];
  reconnectInterval?: number; // initial ms
  maxReconnectInterval?: number;
  reconnectDecay?: number;
  heartbeatInterval?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (msg: WSMessage) => void;
}

export class WSClient extends BrowserEmitter {
  private url: string;
  private protocols?: string | string[];
  private ws?: WebSocket | null;
  private reconnectInterval: number;
  private maxReconnectInterval: number;
  private reconnectDecay: number;
  private heartbeatInterval: number;
  private heartbeatTimer?: number | null;
  private reconnectTimer?: number | null;
  private shouldReconnect = true;
  private connected = false;
  private onOpen?: () => void;
  private onClose?: () => void;
  private onMessage?: (msg: WSMessage) => void;

  constructor(opts: WSClientOptions) {
    super();
    this.url = opts.url;
    this.protocols = opts.protocols;
    this.reconnectInterval = opts.reconnectInterval ?? 1000; // 1s
    this.maxReconnectInterval = opts.maxReconnectInterval ?? 30000; // 30s
    this.reconnectDecay = opts.reconnectDecay ?? 1.5;
    this.heartbeatInterval = opts.heartbeatInterval ?? 25000; // 25s
    this.onOpen = opts.onOpen;
    this.onClose = opts.onClose;
    this.onMessage = opts.onMessage;
    this.connect();
  }

  private connect() {
    this.clearTimers();
    try {
      this.ws = new WebSocket(this.url, this.protocols ?? undefined);
    } catch (err) {
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.connected = true;
      this.emit("open");
      this.onOpen?.();
      this.startHeartbeat();
    };

    this.ws.onmessage = (ev) => {
      let data: any = ev.data;
      try {
        data = JSON.parse(ev.data);
      } catch {
        // keep raw
      }
      this.emit("message", data);
      this.onMessage?.(data);
    };

    this.ws.onclose = (ev) => {
      this.connected = false;
      this.emit("close", ev);
      this.onClose?.();
      if (this.shouldReconnect) this.scheduleReconnect();
    };

    this.ws.onerror = (ev) => {
      this.emit("error", ev);
      // underlying socket will call onclose, schedule reconnect there
    };
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = window.setInterval(() => {
      try {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          // send ping frame as JSON {type: 'ping'}
          this.ws.send(JSON.stringify({ type: "ping", ts: Date.now() }));
        } else {
          // not open, reconnect
          this.scheduleReconnect();
        }
      } catch {
        this.scheduleReconnect();
      }
    }, this.heartbeatInterval);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      window.clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private scheduleReconnect() {
    // compute next interval
    const next = Math.min(
      this.reconnectInterval * this.reconnectDecay,
      this.maxReconnectInterval
    );
    this.reconnectInterval = next;
    this.clearTimers();
    // schedule reconnect
    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, next);
  }

  private clearTimers() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  public send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const payload = typeof data === "string" ? data : JSON.stringify(data);
      this.ws.send(payload);
    } else {
      throw new Error("WebSocket not open");
    }
  }

  public close() {
    this.shouldReconnect = false;
    this.stopHeartbeat();
    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
    }
    this.clearTimers();
  }

  public isConnected() {
    return this.connected;
  }
}
