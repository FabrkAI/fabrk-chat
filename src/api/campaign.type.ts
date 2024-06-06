export type DeliveryMethods = "sms" | "email" | "email_sms";

export type CampaignRow = {
  default?: boolean;
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  goal: string;

  company_id?: string;
  tag_line?: string;
  title?: string;
  step_one_text?: string;
  klaviyo_list_id?: string;
  reimbursement_criteria?: string;

  hero_image_url?: string;
  status: string;
  follow_up_disabled?: boolean;

  title_font_weight?: number;
  paragraph_font_weight?: number;
  type?: string;
  multiple_company_reimbursements_allowed: boolean;
  subtitle_font_weight?: number;
  shopify_default?: boolean;
  shopify_abandoned_cart?: boolean;
  delivery_method?: DeliveryMethods;
};

export type CampaignInsert = {
  lead_id: string;
  company_id: string;
};

export type CampaignUpdate = Partial<CampaignInsert> & {
  id: string;
  name?: string;
  created_at?: string;

  system_prompt_id?: string;
  tag_line?: string;
  title?: string;
  step_one_text?: string;
  klaviyo_list_id?: string;
  company_id?: string;
  status?: string;
  follow_up_disabled?: boolean;
  reimbursement_criteria?: string;
  hero_image_url?: string;
  shopify_default?: boolean;
  shopify_abandoned_cart?: boolean;
  delivery_method?: DeliveryMethods;
};

export type CampaignForPaths = {
  params: {
    campaign: string;
  };
};

export enum CampaignDraftType {
  bogo = "bogo",
  halfOff = "halfOff",
  free = "free",
  custom = "custom",
  loyalty = "loyalty",
  merchandise = "merchandise",
  referral = "referral",
  abandonedCart = "abandonedCart",
}

export type CampaignTypeWithLabel = {
  value: CampaignDraftType;
  label: string;
};

export const campaignTypes = [
  {
    value: CampaignDraftType.bogo,
    label: "BOGO",
  },
  {
    value: CampaignDraftType.halfOff,
    label: "50% Off",
  },
  {
    value: CampaignDraftType.free,
    label: "Free",
  },
  {
    value: CampaignDraftType.custom,
    label: "Custom",
  },
  {
    value: CampaignDraftType.loyalty,
    label: "Loyalty",
  },
  {
    value: CampaignDraftType.merchandise,
    label: "Merchandise",
  },
  {
    value: CampaignDraftType.referral,
    label: "Referral",
  },
  {
    value: CampaignDraftType.abandonedCart,
    label: "Abandoned Cart",
  },
];

export function mapTypeToLabel(type: CampaignDraftType): string {
  const found = campaignTypes.find((t) => t.value === type);
  return found ? found?.label : "N/A";
}

export function mapLabelToType(
  label: string
): CampaignTypeWithLabel | undefined {
  const found = campaignTypes.find((t) => t.label === label);
  return found ? found : undefined;
}
