import { ApiEndpoints } from "./apiEndpoints";
import { fetchData, setHeaderOptions } from "./apiHelpers";
import { TestContextInsert, TestContextRow } from "./testContext.type";

export function getTestContextsByCampaign(
  campaignId: string
): Promise<TestContextRow> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.testContext +
    "/campaign/" +
    campaignId;

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchData<TestContextRow>(url, request);
}

export function setTestContext(
  testContext: TestContextInsert
): Promise<TestContextRow> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.testContext;

  const request = setHeaderOptions({
    method: "POST",
    body: JSON.stringify(testContext),
  });

  return fetchData<TestContextRow>(url, request);
}
