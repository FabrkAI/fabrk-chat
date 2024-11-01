import { ClientRow } from "./client.type";

export type SessionRow = {
  id: string;
  agent: string;
  browser: string;
  created_at: string;
  device: string;
  lead?: ClientRow;
  lead_id: string;
  os: string;
  os_version: string;
  updated_at: string;
};
