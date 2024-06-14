/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCssParamByCompany } from "../api/cssParam.api";
import { CssParamRow } from "../api/cssParam.type";
import { useCampaignContext } from "./CampaignContext";
import { getTestContextsByCampaign } from "../api/testContext.api";
import { TestContextRow } from "../api/testContext.type";

export const InputConfigContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showMessages, setShowMessages] = useState(true);

  const { campaign } = useCampaignContext();

  const { isLoading, data } = useQuery({
    queryFn: () => getCssParamByCompany(campaign?.company_id as string),
    queryKey: ["cssParam"],
    enabled: campaign && campaign.company_id ? true : false,
  });

  const { isLoading: placeholdersLoading, data: placeholders } = useQuery({
    queryFn: () => getTestContextsByCampaign(campaign?.id as string),
    queryKey: ["placeholders"],
    enabled: campaign && campaign.id ? true : false,
  });

  const value = {
    data,
    showMessages,
    setShowMessages,
    loading: isLoading || placeholdersLoading,
    placeholders,
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
  placeholders: {} as TestContextRow | undefined,
});

export const useInputConfigContext = () => useContext(InputConfigContext);
