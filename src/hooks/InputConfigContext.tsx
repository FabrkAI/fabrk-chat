/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCssParamByCompany } from "../api/cssParam.api";
import { CssParamRow } from "../api/cssParam.type";

export const InputConfigContextWrapper = ({
  companyId,
  children,
}: {
  companyId: string;
  children: React.ReactNode;
}) => {
  const [showMessages, setShowMessages] = useState(true);

  const { isLoading, data } = useQuery({
    queryFn: () => getCssParamByCompany(companyId as string),
    queryKey: ["cssParam"],
    enabled: companyId ? true : false,
  });

  const value = {
    data,
    showMessages,
    setShowMessages,
    loading: isLoading,
  };

  return (
    <InputConfigContext.Provider value={value}>
      {children}
    </InputConfigContext.Provider>
  );
};

export const InputConfigContext = createContext({
  data: {} as CssParamRow | undefined,
  showMessages: true,
  setShowMessages: (value: boolean) => {},
  loading: true,
});

export const useInputConfigContext = () => useContext(InputConfigContext);
