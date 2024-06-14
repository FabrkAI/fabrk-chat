export type TestContextRow = {
  id: string;
  name: string;
  created_at: string;
  company_id: string;
  campaign_id: string;
  user_id: string;
  lead_id: string;
  image_type: string;
  is_receipt: boolean;
  image_issues: string[];
  messages: string[];
  email: string;
};

export type TestContextInsert = {
  name?: string | null;
  company_id?: string | null;
  campaign_id?: string | null;
  lead_id?: string | null;
  image_type?: string | null;
  is_receipt?: boolean | null;
  image_issues?: string[] | null;
  messages?: string[] | null;
};
