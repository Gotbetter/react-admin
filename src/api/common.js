import { client } from "./client";

export const fetchCategories = (admin) =>
  client.get("common/room-categories", { params: { admin } });

export const fetchRules = (admin) =>
  client.get("common/rules", { params: { admin } });

export const updateCommon = (commonInfo) => client.patch(`common`, commonInfo);

export const createCommon = (commonInfo) => client.post(`common`, commonInfo);
