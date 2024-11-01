import { ClientRow } from "./client.type";
import { AgentRow } from "./agent.type";

export type LeadCampaignsByCompany = {
  signup_date: string;
  leads: ClientRow[];
  total_lead_count: number;
  payment_sent_count: number;
  total_reimbursement_count: number;
};

export type LeadCampaignRow = {
  id: string;
  lead_id: string;
  campaign_id: string;
  lead?: ClientRow;
  created_at: string;
  user_message_count: number;
  status: string;
  assistant_message_count: number;
  campaign?: AgentRow;
  company_id: string;
};

export type LeadCampaignWithRelations = LeadCampaignRow & {
  campaign: AgentRow;
};

export type LeadCampaignsWithPageAndCount = {
  data: LeadCampaignRow[];
  page: number;
  count: number;
};

export type DailyLeadCampaignsByCompany = {
  day: string;
  lead_campaign_count: number;
};

export type DailyLeadCampaignsByCampaign = {
  day: string;
  lead_campaign_count: number;
  campaign_name: string;
};

export type CountAndHead = {
  count: number;
  head: LeadCampaignRow[];
};

export type LeadCampaignsWithCampaignAgentAndData = {
  leadCampaign: LeadCampaignRow;
};
