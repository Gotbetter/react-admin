import { client } from "./client";

export const fetchDetailPlanRecords = (detailPlanId, admin) =>
  client.get(`details/${detailPlanId}/records`, { params: { admin } });

export const fetchDetailDislikes = (detailPlanId) =>
  client.get(`details/${detailPlanId}/dislike/admin`);

export const fetchNotDetailDislikes = (detailPlanId) =>
  client.get(`details/${detailPlanId}/dislike/members`);
