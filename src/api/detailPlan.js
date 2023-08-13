import { client } from "./client";

export const fetchDetailPlans = (planId, admin) =>
  client.get(`plans/${planId}/details`, { params: { admin } });

export const createDetailPlan = (planId, content, admin) =>
  client.post(`plans/${planId}/details`, content, { params: { admin } });

export const updateDetailPlan = (planId, detailPlanId, content, admin) =>
  client.patch(`plans/${planId}/details/${detailPlanId}`, content, {
    params: { admin },
  });
