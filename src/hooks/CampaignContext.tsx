/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

import { getCampaignByName } from "../api/campaign.api";
import { CampaignRow } from "../api/campaign.type";
import {
  getCompanyIdFromUrl,
  replaceHyphenWithSpace,
} from "../utils/stringManipulation";

export const CampaignContextWrapper = (props: any) => {
  const url = window.location.pathname;

  const companySlug = getCompanyIdFromUrl(url);

  const campaignName = url.split("/")[3];

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [globalLoading, setGlobalLoading] = useState(false);

  const { data: campaign, isLoading } = useQuery({
    queryFn: () =>
      getCampaignByName({
        companySlug: companySlug as string,
        campaignName: replaceHyphenWithSpace(campaignName) as string,
      }),
    queryKey: ["campaign"],
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
    campaign,
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
  campaign: {} as CampaignRow | undefined,
});

export const useCampaignContext = () => useContext(CampaignContext);
