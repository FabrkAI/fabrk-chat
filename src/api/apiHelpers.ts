export type RequestOptions = {
  body?: any;
  method: string;
};

export type HeaderOptions = {
  method: string;
  headers?: {
    "Content-Type"?: string;
  };
  body?: any;
};

export function setFileUploadOptions({
  body,
  method,
}: RequestOptions): HeaderOptions {
  const request = {
    method,
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
