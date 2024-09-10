/* eslint-disable react-hooks/exhaustive-deps */
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { useMessageContext } from "../hooks/MessageContext";
import { useEventStreaming } from "../hooks/StreamMessageContext";
import AssistantMessageChatItem from "./AssistantMessageChatItem";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";
import UserMessageChatItem from "./UserMessageChatItem";

function MessageViewContainer() {
  const { setShowMessages, showMessages } = useInputConfigContext();

  const { text, streaming } = useEventStreaming();

  const { loading, messages, newMessage, messageCreatedTime } =
    useMessageContext();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !event?.target?.closest(".show-messages-button") &&
        !event?.target?.closest(".custom-textarea")
      ) {
        setShowMessages(false);
      }
    };

    if (showMessages) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMessages]);

  useEffect(() => {
    // Send height to parent window after mount and when messages change
    const sendHeight = () => {
      const h = containerRef.current?.offsetHeight || 0;
      const height = h + 200;
      window.parent.postMessage({ height }, "*");
    };

    const resetHeight = () => {
      window.parent.postMessage({ height: 0 }, "*");
    };

    sendHeight();
    window.addEventListener("resize", sendHeight);

    return () => {
      resetHeight();
      window.removeEventListener("resize", resetHeight);
    };
  }, [messages, showMessages]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setShowMessages(true);
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="message-list p-4 relative rounded-lg border-2 border-gray-200"
      style={{
        height: "100%",
        overflowY: "auto",
      }}
    >
      <button
        className="absolute top-1 right-1 "
        onClick={() => setShowMessages(false)}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      {messages?.map((message, index) => {
        if (message.role === "user") {
          return (
            <div key={index}>
              <UserMessageChatItem message={message} />
            </div>
          );
        }
        if (message.role === "assistant") {
          return (
            <div key={index}>
              <AssistantMessageChatItem message={message} />
            </div>
          );
        }
        return null;
      })}
      {(loading || streaming) && !text && <MessageLoadingSkeleton />}
      {text && (
        <div className="flex flex-row">
          <AssistantMessageChatItem
            message={{
              id: newMessage?.id || "",
              content: text,
              created_at: messageCreatedTime || "",
              role: "assistant",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MessageViewContainer;
