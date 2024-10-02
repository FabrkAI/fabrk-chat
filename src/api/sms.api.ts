import { ApiEndpoints } from "../api/apiEndpoints";
import { fetchData, setHeaderOptions } from "../api/apiHelpers";
import { CreateSmsMessage, SmsMessage } from "../api/sms.type";

export function getSms(): Promise<SmsMessage[]> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.message;

  const request = setHeaderOptions({
    method: "GET",
  });

  return fetchData<SmsMessage[]>(url, request);
}

export function getSmsCounts(): Promise<number> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.message + "/count";

  const request = setHeaderOptions({
    method: "GET",
  });

  return fetchData<number>(url, request);
}

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

export function getSmsMessagesByLeadForDemo({
  leadId,
}: {
  leadId: string;
}): Promise<SmsMessage[]> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.message +
    "/demo/lead-id/" +
    leadId;

  const request = setHeaderOptions({
    method: "GET",
  });

  return fetchData<SmsMessage[]>(url, request);
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
