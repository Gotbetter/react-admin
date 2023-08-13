import { client } from "./client";

export const fetchDetailPlans = (planId, admin) =>
  client.get(`plans/${planId}/details`, { params: { admin } });

export const createDetailPlan = (planId, content, admin) =>
  client.post(`plans/${planId}/details`, content, { params: { admin } });

export const updateDetailPlan = (planId, detailPlanId, content, admin) =>
  client.patch(`plans/${planId}/details/${detailPlanId}`, content, {
    params: { admin },
  });

export const deleteDetailPlan = (planId, detailPlanId, admin) =>
  client.delete(`plans/${planId}/details/${detailPlanId}`, {
    params: { admin },
  });

export const completeDetailPlan = (planId, detailPlanId) =>
  client.patch(`plans/${planId}/details/${detailPlanId}/completed/admin`);

export const unCompleteDetailPlan = (planId, detailPlanId) =>
  client.patch(`plans/${planId}/details/${detailPlanId}/completed-undo/admin`);

export const fetchDetailPlan = (planId, detailPlanId) =>
  client.get(`plans/${planId}/details/${detailPlanId}`);
