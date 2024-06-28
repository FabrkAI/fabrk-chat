import { FileStoreRow } from "./fileStore.type";

export type CsvResponse = {
  headers: {
    data: string;
    headers: string[];
  };
  json: {
    data: any;
    headers: any;
  };
  path: string;
};

export type FileUploadResponse = {
  path: string;
  file?: FileStoreRow;
};
