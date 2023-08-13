import { client } from "./client";

export const createPlans = (participantInfo, admin) =>
  client.post("plans", participantInfo, { params: { admin } });

export const fetchPlans = (participantId) =>
  client.get(`plans/${participantId}/all`);

export const fetchPlanDislikes = (planId) =>
  client.get(`plans/${planId}/dislike/admin`);
