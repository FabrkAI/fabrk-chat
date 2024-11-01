import { ApiEndpoints } from "./apiEndpoints";
import { fetchData } from "./apiHelpers";
import { AgentRow } from "./agent.type";

export function getAgentBySlug({
  companySlug,
  agentSlug,
}: {
  companySlug: string;
  agentSlug: string;
}): Promise<AgentRow> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.agent +
    `/company/${companySlug}/slug/${agentSlug}`;

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchData<AgentRow>(url, request);
}
