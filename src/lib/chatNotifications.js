// Helper for Browser & In-App Chat Notifications

export function getNotificationPermissionState() {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission; // "default", "granted", "denied"
}

export async function requestChatNotificationPermission() {
  if (!("Notification" in window)) return "unsupported";
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch (err) {
    console.warn("Notification permission request failed:", err);
    return "denied";
  }
}

export function sendBrowserNotification(title, options = {}) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return false;
  }

  try {
    const notification = new Notification(title, {
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      body: "Open AMI Live to read the message.",
      ...options,
    });

    notification.onclick = function (e) {
      e.preventDefault();
      window.focus();
      if (window.location.pathname !== "/our-chaos/chat") {
        window.location.href = "/our-chaos/chat";
      }
      notification.close();
    };
    return true;
  } catch (err) {
    console.warn("Error firing browser notification:", err);
    return false;
  }
}
