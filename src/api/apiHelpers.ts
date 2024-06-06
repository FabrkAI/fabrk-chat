export type RequestOptions = {
  body?: any;
  method: string;
};

export type HeaderOptions = {
  method: string;
  headers: {
    "Content-Type"?: string;
    access_token?: string;
    refresh_token?: string;
  };
  body?: any;
};

export function setHeaderOptions({
  body,
  method,
}: RequestOptions): HeaderOptions {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const request = {
    method,
    headers: {
      "Content-Type": "application/json",
      [access_token ? "access_token" : ""]: access_token,
      [refresh_token ? "refresh_token" : ""]: refresh_token,
    },
    [body ? "body" : ""]: body ? body : "",
  };

  return request;
}

export function setFileUploadOptions({
  body,
  method,
}: RequestOptions): HeaderOptions {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const request = {
    method,
    headers: {
      [access_token ? "access_token" : ""]: access_token,
      [refresh_token ? "refresh_token" : ""]: refresh_token,
    },
    [body ? "body" : ""]: body ? body : "",
  };

  return request;
}

export async function fetchData<T>(
  url: string,
  requestOptions: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Unknown error occurred.";
      throw new Error(errorMessage);
    }

    const res = await response.json();

    if (res.error) {
      throw new Error(res.error);
    }

    return res.data as T;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}
