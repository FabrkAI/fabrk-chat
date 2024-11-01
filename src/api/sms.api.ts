import { ApiEndpoints } from "../api/apiEndpoints";
import { fetchData } from "../api/apiHelpers";
import { CreateSmsMessage, SmsMessage } from "../api/sms.type";

export function getSmsMessagesByLead({
  leadId,
}: {
  leadId: string;
}): Promise<SmsMessage[]> {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.message + "/lead-id/" + leadId;

  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetchData(url, request);
}

export function createNewMessage(values: CreateSmsMessage): Promise<any> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.message + "/create";

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url,
    body: JSON.stringify({ ...values }),
  };

  return fetchData(url, request);
}
