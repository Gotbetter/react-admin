import { client } from "./client";

export const fetchParticipants = (roomId, accepted, admin) =>
  client.get(`participants/${roomId}`, { params: { accepted, admin } });

export const deleteParticipant = (participantId) =>
  client.delete(`participants/${participantId}`);
