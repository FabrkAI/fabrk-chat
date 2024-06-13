import { ApiEndpoints } from "../api/apiEndpoints";
import { fetchData, setHeaderOptions } from "../api/apiHelpers";
import {
  ConversationsOverview,
  CreateSmsMessage,
  SmsMessage,
} from "../api/sms.type";

export function getSms(): Promise<SmsMessage[]> {
  const url = process.env.REACT_APP_API_URL + "/sms";

  const request = setHeaderOptions({
    method: "GET",
  });

  return fetchData<SmsMessage[]>(url, request);
}

export function getSmsCounts(): Promise<number> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.sms + "/count";

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
    process.env.REACT_APP_API_URL + ApiEndpoints.sms + "/lead-id/" + leadId;

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
    ApiEndpoints.sms +
    "/demo/lead-id/" +
    leadId;

  const request = setHeaderOptions({
    method: "GET",
  });

  return fetchData<SmsMessage[]>(url, request);
}

export function getNewSmsMessagesByLeadForFabrk({
  leadId,
  campaignId,
  createdTime,
}: {
  leadId: string;
  campaignId: string;
  createdTime: string | null | undefined;
}): Promise<SmsMessage> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.sms + "/fabrk/new";

  const request = {
    method: "POST",
    body: JSON.stringify({ campaignId, leadId, createdTime }),
    headers: { "Content-Type": "application/json" },
  };

  return fetchData<SmsMessage>(url, request);
}

export function sendMessage(values: CreateSmsMessage): Promise<any> {
  const url = process.env.REACT_APP_API_URL + "/sms/fabrk/create";

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url,
    body: JSON.stringify({ ...values }),
  };

  return fetch(request.url, request);
}

export function sendManualSms({
  leadId,
  message,
  phone,
  user,
  campaignId,
  companyId,
}: {
  leadId: string;
  message: string;
  phone?: string;
  user?: string;
  campaignId?: string;
  companyId?: string;
}): Promise<any> {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.sms + "/send-sms-message";

  const body = JSON.stringify({
    leadId,
    message,
    ...(phone && { phone }),
    ...(user && { user }),
    ...(campaignId && { campaignId }),
    ...(companyId && { companyId }),
  });

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url,
    body,
  };

  return fetch(request.url, request);
}

export function rerunAiSmsResponse(messageId: string) {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.sms + "/resend/" + messageId;

  const request = setHeaderOptions({
    method: "PUT",
  });

  return fetchData<string>(url, request);
}

export function getConversations() {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.sms + "/conversations";

  const request = setHeaderOptions({
    method: "GET",
  });

  return fetchData<ConversationsOverview>(url, request);
}
