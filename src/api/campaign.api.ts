import { ApiEndpoints } from "./apiEndpoints";
import { fetchData } from "./apiHelpers";
import { CampaignRow } from "./campaign.type";

export function getCampaignByName({
  companySlug,
  campaignName,
}: {
  companySlug: string;
  campaignName: string;
}): Promise<CampaignRow> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.campaign +
    `/company/${companySlug}/name/${campaignName}`;

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchData<CampaignRow>(url, request);
}
