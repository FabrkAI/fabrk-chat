/* eslint-disable react-hooks/exhaustive-deps */
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { useMessageContext } from "../hooks/MessageContext";
import UserMessageChatItem from "./UserMessageChatItem";
import AssistantMessageChatItem from "./AssistantMessageChatItem";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

function MessageViewContainer() {
  const [borderColor] = useState("rgba(62, 73, 174, 0.2)");

  const { data, setShowMessages, showMessages } = useInputConfigContext();

  const { backgroundColor, color, borderRadius } = data || {};

  const { loading, messages } = useMessageContext();

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
      className="message-list p-4 max-w-screen relative"
      style={{
        backgroundColor: backgroundColor,
        color,
        borderRadius: `${borderRadius}px`,
        borderColor: borderColor,
        height: "100%",
      }}
    >
      <button
        className="absolute top-1 right-1 "
        style={{
          color,
        }}
        onClick={() => setShowMessages(false)}
      >
        <XMarkIcon className="h-6 w-6" color={color} />
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
      {loading && <MessageLoadingSkeleton />}
    </div>
  );
}

export default MessageViewContainer;
