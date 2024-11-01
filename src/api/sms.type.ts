import { ClientRow } from "./client.type";

export type TestConfig = {
  lineItems: string;
  date: string;
  time: string;
  totalAmount: string;
};

export type SmsMessage = {
  content: string;
  created_at: string;
  id: string;
  media_url?: string | null;
  role: string;
  twilio_account_sid?: string;
  twilio_sid?: string;
  campaign_id?: string;
  company_id?: string;
  tag?: string[];
  generated_by?: string;
  lead?: ClientRow;
  lead_id?: string;
  thread_id?: string;
};

export type ConversationsOverview = {
  totalConversation: string;
  totalUserConversations: string;
};

export type CreateSmsMessage = {
  leadId: string;
  content: string;
  agentId: string;
  source: string;
  companyId: string;
  mediaUrl?: string;
  threadId?: string;
  fileStoreId?: string;
};
