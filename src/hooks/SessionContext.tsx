/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { createNewSession, getSessionById } from "../api/session.api";
import { SessionRow } from "../api/session.type";
import { getCompanyIdFromUrl } from "../utils/stringManipulation";
import { useCampaignContext } from "./CampaignContext";

export const SessionContextWrapper = (props: any) => {
  const url = window.location.pathname;

  const { campaign } = useCampaignContext();

  const [sessionId, setSessionId] = useState<string>("");

  const companySlug = getCompanyIdFromUrl(url);
  const campaignName = url.split("/")[3];

  const { mutate: createSession, isLoading } = useMutation(createNewSession, {
    onSuccess: async (res) => {
      setSessionId(res.id);
      localStorage.setItem(`${companySlug}-${campaignName}-session_id`, res.id);
    },
    onError(error: Error) {},
  });

  const { mutate: getSession, data: fabrkSession } = useMutation(
    getSessionById,
    {
      onError(error: Error) {},
    }
  );

  useEffect(() => {
    if (!sessionId) {
      const foundSessionId = localStorage.getItem(
        `${companySlug}-${campaignName}-session_id`
      );
      if (foundSessionId) {
        setSessionId(foundSessionId);
      } else {
        createSession({ source: "fabrk", campaignId: campaign?.id as string });
      }
    }
  }, [campaign]);

  useEffect(() => {
    if (sessionId) {
      getSession(sessionId);
    }
  }, [sessionId]);

  const value = { fabrkSession, loading: isLoading };

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const SessionContext = createContext({
  fabrkSession: {} as SessionRow | undefined,

  loading: false,
});

export const useSessionContext = () => useContext(SessionContext);
