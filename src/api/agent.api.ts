import { ApiEndpoints } from "./apiEndpoints";
import { fetchData } from "./apiHelpers";
import { AgentRow } from "./agent.type";

export function getAgentByName({
  companySlug,
  agentName,
}: {
  companySlug: string;
  agentName: string;
}): Promise<AgentRow> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.agent +
    `/company/${companySlug}/name/${agentName}`;

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchData<AgentRow>(url, request);
}
