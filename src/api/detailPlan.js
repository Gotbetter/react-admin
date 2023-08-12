import { client } from "./client";

export const fetchDetailPlans = (planId, admin) =>
  client.get(`plans/${planId}/details`, { params: { admin } });
