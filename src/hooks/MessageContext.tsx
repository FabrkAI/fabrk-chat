/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  getNewSmsMessagesByLeadForFabrk,
  getSmsMessagesByLead,
  sendMessage,
} from "../api/sms.api";
import { SmsMessage } from "../api/sms.type";
import { useCampaignContext } from "./CampaignContext";
import { useSessionContext } from "./SessionContext";

export const MessageContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { campaign } = useCampaignContext();

  const { fabrkSession } = useSessionContext();

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<SmsMessage[]>([]);

  const [messageCreatedTime, setMessageCreatedTime] = useState<string | null>();

  const { mutate: createMessage } = useMutation(sendMessage, {
    onMutate: async (variables) => {
      const now = new Date().toISOString();
      setMessageCreatedTime(now);
      const newMessage = {
        id: "0",
        leadId: variables.leadId,
        created_at: now,
        updated_at: now,
        content: variables.message,
        role: "user",
        thread_id: variables.threadId,
        campaign_id: variables.campaignId,
      } as SmsMessage;
      setMessages([...messages, newMessage]);
    },

    onError(error: Error) {},
  });

  const { data: newMessage } = useQuery({
    queryKey: "newMessages",
    queryFn: () =>
      getNewSmsMessagesByLeadForFabrk({
        leadId: fabrkSession?.lead_id || "",
        campaignId: campaign?.id || "",
        createdTime: messageCreatedTime,
      }),
    enabled: loading,
    refetchInterval: 3000,
  });

  function handleCreateMessage(content: string) {
    setLoading(true);

    createMessage({
      campaignId: campaign?.id as string,
      companyId: campaign?.company_id as string,
      leadId: fabrkSession?.lead_id as string,
      message: content,
      source: window.location.href,
    });
  }

  const { mutate: getMessages } = useMutation(getSmsMessagesByLead, {
    onSuccess: async (res) => {
      setMessages(res);
    },
    onError(error: Error) {
      console.log(error);
    },
    onSettled: () => {
      setLoading(false);
      setMessageCreatedTime(null);
    },
  });

  useEffect(() => {
    if (fabrkSession?.lead_id) {
      getMessages({ leadId: fabrkSession?.lead_id });
    }
  }, [fabrkSession]);

  useEffect(() => {
    if (newMessage) {
      if (campaign && fabrkSession?.lead_id) {
        getMessages({ leadId: fabrkSession?.lead_id });
      }
    }
  }, [newMessage]);

  console.log(messages);

  const value = {
    messages,
    handleCreateMessage,
    loading,
    setMessages,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const MessageContext = createContext({
  messages: {} as SmsMessage[] | undefined,
  handleCreateMessage: {} as (content: string) => void,
  loading: false,
  setMessages: {} as React.Dispatch<React.SetStateAction<SmsMessage[]>>,
});

export const useMessageContext = () => useContext(MessageContext);
