/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

import { getAgentByName } from "../api/agent.api";
import { AgentRow } from "../api/agent.type";
import {
  getCompanyIdFromUrl,
  replaceHyphenWithSpace,
} from "../utils/stringManipulation";

export const AgentContextWrapper = (props: any) => {
  const url = window.location.pathname;

  const companySlug = getCompanyIdFromUrl(url);

  const agentName = url.split("/")[3];

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [globalLoading, setGlobalLoading] = useState(false);

  const { data: agent, isLoading } = useQuery({
    queryFn: () =>
      getAgentByName({
        companySlug: companySlug as string,
        agentName: replaceHyphenWithSpace(agentName) as string,
      }),
    queryKey: ["agent", companySlug, agentName],
    enabled: true,
    onSettled: () => {
      setGlobalLoading(false);
    },
  });

  const value = {
    loading: isLoading || globalLoading,
    setGlobalLoading,
    errorMessage,
    setErrorMessage,
    agent,
  };

  return (
    <CampaignContext.Provider value={value}>
      {props.children}
    </CampaignContext.Provider>
  );
};

export const CampaignContext = createContext({
  loading: false,
  setGlobalLoading: {} as (loading: boolean) => void,
  errorMessage: "",
  setErrorMessage: {} as (message: string) => void,
  agent: {} as AgentRow | undefined,
});

export const useAgentContext = () => useContext(CampaignContext);