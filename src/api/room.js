import { client } from "./client";

export const fetchRooms = () => client.get("rooms/admin");
