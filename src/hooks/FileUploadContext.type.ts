import { UseMutateFunction } from "react-query";
import { CsvResponse, FileUploadResponse } from "../api/storage.type";

export type FileUploadMutation = UseMutateFunction<
  CsvResponse,
  Error,
  {
    file: File;
    additionalData?: any;
  },
  unknown
>;

export type ImageFileUploadMutation = UseMutateFunction<
  FileUploadResponse,
  Error,
  {
    file: File;
    additionalData?: any;
  },
  unknown
>;

export type UploadMultipleMutation = UseMutateFunction<
  string[],
  Error,
  {
    files: File[];
    additionalData?: any;
  },
  unknown
>;
