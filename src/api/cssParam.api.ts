import { ApiEndpoints } from "./apiEndpoints";
import { fetchData } from "./apiHelpers";
import { CreateCssParam, CssParamRow, UpdateCssParam } from "./cssParam.type";

export function getCssParamByCompany(campaignId: string): Promise<CssParamRow> {
  const url =
    process.env.REACT_APP_API_URL +
    ApiEndpoints.cssParam +
    `/campaign/${campaignId}`;

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchData<CssParamRow>(url, request);
}

export function createCssParam(cssParam: CreateCssParam): Promise<CssParamRow> {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.cssParam + `/company`;

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cssParam),
  };

  return fetchData<CssParamRow>(url, request);
}

export function updateCssParam(cssParam: UpdateCssParam): Promise<CssParamRow> {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.cssParam + `/${cssParam.id}`;

  const request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cssParam),
  };

  return fetchData<CssParamRow>(url, request);
}
