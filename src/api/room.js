import { client } from "./client";

export const createRoom = (roomInfo) => client.post("rooms/admin", roomInfo);

export const fetchRooms = (admin) => client.get("rooms", { params: { admin } });

export const fetchOneRoom = (roomId, admin) =>
  client.get(`rooms/${roomId}`, { params: { admin } });

export const updateRoom = (roomId, roomInfo) =>
  client.patch(`rooms/${roomId}/admin`, roomInfo);

export const deleteRoom = (roomId) => client.delete(`rooms/${roomId}`);
