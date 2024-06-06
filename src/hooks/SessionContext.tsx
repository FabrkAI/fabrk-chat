/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { SessionRow } from "../api/session.type";
import { createNewSession, getSessionById } from "../api/session.api";

export const SessionContextWrapper = (props: any) => {
  const [sessionId, setSessionId] = useState<string>("");

  const { mutate: createSession, isLoading } = useMutation(createNewSession, {
    onSuccess: async (res) => {
      setSessionId(res.id);
      localStorage.setItem("input_session_id", res.id);
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
      const foundSessionId = localStorage.getItem("input_session_id");
      if (foundSessionId) {
        setSessionId(foundSessionId);
      }
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      getSession(sessionId);
    }
  }, [sessionId]);

  const value = { fabrkSession, createSession, loading: isLoading };

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const SessionContext = createContext({
  fabrkSession: {} as SessionRow | undefined,
  createSession: {} as UseMutateFunction<
    SessionRow,
    Error,
    {
      source: string;
      campaignId: string;
    },
    unknown
  >,
  loading: false,
});

export const useSessionContext = () => useContext(SessionContext);
