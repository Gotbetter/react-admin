import { client } from "./client";

export const createPlans = (participantInfo, admin) =>
  client.post("plans", participantInfo, { params: { admin } });
