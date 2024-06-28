import { ApiEndpoints } from "../api/apiEndpoints";
import { fetchData, setFileUploadOptions } from "../api/apiHelpers";
import { CsvResponse, FileUploadResponse } from "./storage.type";

export function uploadFile({
  file,
  additionalData,
}: {
  file: File;
  additionalData?: any;
}) {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.storage;

  const formData = new FormData();
  formData.append(file.name, file);

  if (additionalData) {
    for (const key in additionalData) {
      formData.append(key, additionalData[key]);
    }
  }
  const request = setFileUploadOptions({
    method: "POST",
    body: formData,
  });

  return fetchData<FileUploadResponse>(url, request);
}

export function uploadMultipleFiles({
  files,
  additionalData,
}: {
  files: File[];
  additionalData?: any;
}) {
  const url =
    process.env.REACT_APP_API_URL + ApiEndpoints.storage + `/multiple`;

  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append(file.name, file);
  });

  if (additionalData) {
    for (const key in additionalData) {
      formData.append(key, additionalData[key]);
    }
  }
  const request = {
    method: "POST",
    body: formData,
  };

  return fetchData<string[]>(url, request);
}

export function uploadCsvFile({
  file,
  additionalData,
}: {
  file: File;
  additionalData?: any;
}): Promise<CsvResponse> {
  const url = process.env.REACT_APP_API_URL + ApiEndpoints.storage + `/csv`;

  const formData = new FormData();
  formData.append(file.name, file);

  if (additionalData) {
    for (const key in additionalData) {
      formData.append(key, additionalData[key]);
    }
  }
  const request = setFileUploadOptions({
    method: "POST",
    body: formData,
  });

  return fetchData<CsvResponse>(url, request);
}
