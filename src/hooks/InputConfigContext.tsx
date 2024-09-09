/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getTestContextsByCampaign } from "../api/testContext.api";
import { TestContextRow } from "../api/testContext.type";
import { useCampaignContext } from "./CampaignContext";

export const InputConfigContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showMessages, setShowMessages] = useState(true);

  const { campaign } = useCampaignContext();

  const { isLoading: placeholdersLoading, data: placeholders } = useQuery({
    queryFn: () => getTestContextsByCampaign(campaign?.id as string),
    queryKey: ["placeholders"],
    enabled: campaign && campaign.id ? true : false,
  });

  const value = {
    showMessages,
    setShowMessages,
    loading: placeholdersLoading,
    placeholders,
  };

  return (
    <InputConfigContext.Provider value={value}>
      {children}
    </InputConfigContext.Provider>
  );
};

export const InputConfigContext = createContext({
  showMessages: true,
  setShowMessages: (value: boolean) => {},
  loading: true,
  placeholders: {} as TestContextRow | undefined,
});

export const useInputConfigContext = () => useContext(InputConfigContext);
