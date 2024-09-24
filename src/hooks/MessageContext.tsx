/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { createNewMessage, getSmsMessagesByLead } from "../api/sms.api";
import { SmsMessage } from "../api/sms.type";
import { useAgentContext } from "./AgentContext";
import { useSessionContext } from "./SessionContext";
import { useEventStreaming } from "./StreamMessageContext";

export const MessageContextWrapper = (props: any) => {
  const { fabrkSession } = useSessionContext();
  const { agent } = useAgentContext();

  const [showMessages, setShowMessages] = useState(false);

  const [threadId, setThreadId] = useState<string | undefined>();

  const [newThread, setNewThread] = useState(false);

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [newMessage, setNewMessage] = useState<SmsMessage | undefined>();

  const [messageCreatedTime, setMessageCreatedTime] = useState<string | null>();

  const { setText } = useEventStreaming();

  const { mutate: createMessage, reset } = useMutation(createNewMessage, {
    onSuccess: async (res) => {
      setNewMessage(res);
      if (messages) {
        setMessages((prev) => [...prev, res]);
      } else {
        setMessages([res]);
      }
    },
  });

  function handleCreateMessage({
    content,
    fileStoreId,
    actionId,
  }: {
    content: string;
    fileStoreId?: string;
    actionId?: string;
  }) {
    setLoading(true);
    if (!fabrkSession) {
      setLoading(false);
      return;
    }

    createMessage({
      agentId: agent?.id as string,
      companyId: agent?.company_id as string,
      leadId: fabrkSession.lead_id as string,
      content,
      source: "fabrk",
      ...(threadId && !newThread && { threadId }),
      ...(fileStoreId && { fileStoreId }),
      ...(actionId && { actionId }),
    });
  }

  const { mutate: getMessages } = useMutation(getSmsMessagesByLead, {
    onSuccess: async (res) => {
      setMessages(res);
      setText("");
    },
    onError(error: Error) {
      console.log(error);
    },
    onSettled: () => {
      setLoading(false);
      setMessageCreatedTime(null);
    },
  });

  function getUpdatedMessages() {
    if (fabrkSession) {
      getMessages({ leadId: fabrkSession.lead_id as string });
    }
  }

  useEffect(() => {
    if (fabrkSession && fabrkSession.lead_id) {
      getUpdatedMessages();
    }
  }, [fabrkSession]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setShowMessages(true);
    }
  }, [messages]);

  const value = {
    messages,
    handleCreateMessage,
    loading,
    setMessages,
    setNewThread,
    setThreadId,
    threadId,
    newMessage,
    messageCreatedTime,
    reset,
    getUpdatedMessages,
    setNewMessage,
    showMessages,
    setShowMessages,
  };

  return (
    <MessageContext.Provider value={value}>
      {props.children}
    </MessageContext.Provider>
  );
};

export const MessageContext = createContext({
  messages: {} as SmsMessage[] | undefined,
  handleCreateMessage: {} as ({
    content,
    fileStoreId,
    actionId,
  }: {
    content: string;
    fileStoreId?: string;
    actionId?: string;
  }) => void,
  loading: false,
  setMessages: {} as React.Dispatch<React.SetStateAction<SmsMessage[]>>,
  setNewThread: {} as React.Dispatch<React.SetStateAction<boolean>>,
  setThreadId: {} as React.Dispatch<React.SetStateAction<string | undefined>>,
  threadId: "" as string | undefined,

  messageCreatedTime: "" as string | null | undefined,
  newMessage: {} as SmsMessage | undefined,
  reset: {} as () => void,
  getUpdatedMessages: {} as () => void,
  setNewMessage: {} as React.Dispatch<
    React.SetStateAction<SmsMessage | undefined>
  >,
  showMessages: false,
  setShowMessages: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

export const useMessageContext = () => useContext(MessageContext);
