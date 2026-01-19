import { URLs } from "@/constants/urls";


export class NotificationService {
  public static async registerDeviceOnServer(): Promise<string> {
    try {
      const res = await fetch(URLs.DEVICES.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        console.warn("Device registration returned non-OK:", res.status);
      }
      const data = await res.json() as {device_id: string}
      return data.device_id;
    } catch (err) {
      console.warn("Device registration error:", err);
      return "";
    }
  }
}
