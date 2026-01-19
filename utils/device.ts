import { DEVICE_KEY } from "@/constants/commons";

export function getDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_KEY);
  if (!deviceId) {
    return "";
  }
  return deviceId as string;
}

export function clearDeviceId() {
  localStorage.removeItem(DEVICE_KEY);
}
