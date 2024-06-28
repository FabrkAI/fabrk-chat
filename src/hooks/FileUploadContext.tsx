/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import { FileStoreRow } from "../api/fileStore.type";
import {
  uploadFile,
  uploadMultipleFiles,
  uploadCsvFile,
} from "../api/storage.api";
import { CsvResponse } from "../api/storage.type";
import {
  UploadMultipleMutation,
  ImageFileUploadMutation,
  FileUploadMutation,
} from "./FileUploadContext.type";

export const FileUploadContextWrapper = (props: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [createdFileStore, setCreatedFileStore] =
    useState<FileStoreRow | null>();

  const handleOpenFileSelect = (e: any) => {
    hiddenFileInput?.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleMultipleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files));
    }
  };

  const [filePath, setFilePath] = useState<string>("");
  const [filePaths, setFilePaths] = useState<string[]>([]);

  const { mutate: uploadOneFile, isLoading: fileUploadLoading } = useMutation(
    uploadFile,
    {
      onSuccess: async (res) => {
        setFilePath(res.path);
        setCreatedFileStore(res.file);
        setFile(null);
      },
      onError(error: Error) {
        console.log(error.message);
      },
    }
  );

  const { mutate: uploadMultiple } = useMutation(uploadMultipleFiles, {
    onSuccess: async (res) => {
      setFilePaths(res);
      setFiles([]);
    },
    onError(error: Error) {
      console.log(error.message);
    },
  });

  const {
    mutate: uploadCsv,
    data: csvUploadResponse,
    isLoading,
    reset,
  } = useMutation(uploadCsvFile, {
    onSuccess: async (res) => {
      setFile(null);
    },
    onError(error: Error) {
      console.log(error.message);
    },
  });

  const value = {
    handleOpenFileSelect,
    file,
    files,
    handleChange,
    hiddenFileInput,
    setFile,
    uploadOneFile,
    filePath,
    setFilePath,
    uploadCsv,
    csvUploadResponse,
    loading: isLoading || fileUploadLoading,
    reset,
    handleMultipleChange,
    uploadMultiple,
    filePaths,
    createdFileStore,
  };

  return (
    <FileUploadContext.Provider value={value}>
      {props.children}
    </FileUploadContext.Provider>
  );
};

export const FileUploadContext = createContext({
  uploadMultiple: {} as UploadMultipleMutation,
  handleOpenFileSelect: (e: any) => {},
  file: null as File | null,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => {},
  hiddenFileInput: null as any,
  setFile: (file: File | null) => {},
  uploadOneFile: {} as ImageFileUploadMutation,
  filePath: "",
  setFilePath: (filePath: string) => {},
  uploadCsv: {} as FileUploadMutation,
  csvUploadResponse: {} as CsvResponse | undefined,
  loading: false,
  reset: {} as any,
  handleMultipleChange: (event: ChangeEvent<HTMLInputElement>) => {},
  files: [] as File[],
  filePaths: [] as string[],
  createdFileStore: {} as FileStoreRow | null | undefined,
});

export const useFileUploadContext = () => useContext(FileUploadContext);
