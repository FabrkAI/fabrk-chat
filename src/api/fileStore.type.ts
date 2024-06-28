export type FileStoreRow = {
  id: string;
  created_at: string;
  company_id: string;
  url: string;
  vector_store_id: string;
};

export type AddFileStoreToAiFunction = {
  urls: string[];
  agentId: string;
  companyId: string;
  name: string;
};
