import { client } from "./client";

export const fetchParticipants = (roomId, accepted, admin) =>
  client.get(`participants/${roomId}`, { params: { accepted, admin } });

export const deleteParticipant = (participantId) =>
  client.delete(`participants/${participantId}`);

export const joinRoomRequest = (requestInfo) =>
  client.post(`participants/admin`, requestInfo);

export const approveJoinRequest = (requestInfo, admin) =>
  client.patch("participants", requestInfo, { params: { admin } });

export const rejectJoinRequest = (requestInfo, admin) =>
  client.post("participants/reject", requestInfo, { params: { admin } });
