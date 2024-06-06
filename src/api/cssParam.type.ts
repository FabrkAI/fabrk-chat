export type CssParamRow = {
  id: string;
  created_at: string;
  updated_at: string;
  width: string;
  height: string;
  border: string;
  outline: string;
  boxShadow: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
  borderColor: string;
  company_id: string;
};

export type CreateCssParam = {
  width?: string;
  height?: string;
  border?: string;
  outline?: string;
  boxShadow?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  borderColor?: string;
  company_id: string;
};

export type UpdateCssParam = {
  id: string;
  width?: string;
  height?: string;
  border?: string;
  outline?: string;
  boxShadow?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  borderColor?: string;
  company_id: string;
};
