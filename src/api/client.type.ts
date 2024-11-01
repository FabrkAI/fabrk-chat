export type ClientRow = {
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
  first_name: string;
  last_name: string;
  source: string;
  company_id?: string;
  user_id?: string;
};

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
};
