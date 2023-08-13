import { client } from "./client";

export const createPlans = (participantInfo, admin) =>
  client.post("plans", participantInfo, { params: { admin } });

export const fetchPlans = (participantId) =>
  client.get(`plans/${participantId}/all`);

export const fetchPlanDislikes = (planId) =>
  client.get(`plans/${planId}/dislike/admin`);

export const createPlanDislike = (planId, userInfo) =>
  client.post(`plans/${planId}/dislike/admin`, userInfo);

export const fetchNotDislikes = (planId) =>
  client.get(`plans/${planId}/dislike/members`);
