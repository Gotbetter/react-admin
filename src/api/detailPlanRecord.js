import { client } from "./client";

export const fetchDetailPlanRecords = (detailPlanId, admin) =>
  client.get(`details/${detailPlanId}/records`, { params: { admin } });

export const createDetailRecord = (detailPlanId, recordInfo) =>
  client.post(`details/${detailPlanId}/records/admin`, recordInfo);

export const updateDetailRecord = (detailPlanId, recordId, recordInfo) =>
  client.patch(`details/${detailPlanId}/records/${recordId}/admin`, recordInfo);

export const fetchDetailDislikes = (detailPlanId) =>
  client.get(`details/${detailPlanId}/dislike/admin`);

export const fetchNotDetailDislikes = (detailPlanId) =>
  client.get(`details/${detailPlanId}/dislike/members`);
