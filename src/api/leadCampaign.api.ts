import { ApiEndpoints } from "../api/apiEndpoints";
import { fetchData } from "../api/apiHelpers";
import { LeadCampaignRow } from "./leadCampaign.type";

export function addLeadToCampaign({
  campaignName,
  leadId,
}: {
  campaignName: string;
  leadId: string;
}): Promise<LeadCampaignRow> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.leadCampaign +
    "/fabrk/add-lead";

  const request = {
    method: "POST",
    body: JSON.stringify({ campaignName, leadId }),
    headers: { "Content-Type": "application/json" },
  };

  return fetchData<LeadCampaignRow>(url, request);
}
