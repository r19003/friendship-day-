// Realtime channel names and room constants
export const ROOM_ID = "ami";

export const CHANNELS = {
  JOKES: `realtime:jokes:${ROOM_ID}`,
  CHAT: `realtime:chat:${ROOM_ID}`,
  WALL: `realtime:wall:${ROOM_ID}`,
  BUCKET: `realtime:bucket:${ROOM_ID}`,
  PRESENCE: `presence:room:${ROOM_ID}`,
};
