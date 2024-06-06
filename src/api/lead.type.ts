export type LeadsWithPageAndCount = {
  data: LeadWithMessageCount[];
  page: number;
  count: number;
};

export type LeadRow = {
  campaign_id: string;
  id: string;
  created_at: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  is_test: boolean;
  linked_number: string;
  first_name: string;
  last_name: string;
  sms_mode: string | null;
  consent_to_sms_date: string;
  source: string;
  company_id?: string;
  payment_account_type: string;
  payment_account_identifier: string;

  user_id?: string;
};

export interface LeadWithMessageCount extends LeadRow {
  user_message_count: number;
  assistant_message_count: number;
}

export type LeadInsert = {
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  is_test?: boolean;
  linked_number?: string;
  company_id?: string;
  campaign_id?: string;
  first_name?: string;
  last_name?: string;
  source?: string;
  referral_id?: string;
};

export type LeadCount = {
  id: string;
  campaign_name: string;
  lead_date: string;
  lead_count: number;
};

export type LeadCountTotalsByCampaign = {
  Cumulative: number;
  date: string;
};
