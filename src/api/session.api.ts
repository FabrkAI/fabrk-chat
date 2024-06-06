import { ApiEndpoints } from "./apiEndpoints";
import { fetchData } from "./apiHelpers";
import { SessionRow } from "./session.type";

export function createNewSession({
  source,
  campaignId,
}: {
  source: string;
  campaignId: string;
}): Promise<SessionRow> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.session + "/input";

  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, campaignId }),
  };

  return fetchData<SessionRow>(url, request);
}

export function getSessionById(sessionId: string): Promise<SessionRow> {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.session + "/" + sessionId;

  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetchData<SessionRow>(url, request);
}
