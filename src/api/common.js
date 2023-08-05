import { client } from "./client";

export const fetchCommons = (admin) =>
  client.get("common/room-categories", { params: { admin } });

export const updateCommon = (commonInfo) => client.patch(`common`, commonInfo);
