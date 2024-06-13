/* eslint-disable react-hooks/exhaustive-deps */
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { useMessageContext } from "../hooks/MessageContext";
import UserMessageChatItem from "./UserMessageChatItem";
import AssistantMessageChatItem from "./AssistantMessageChatItem";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

function MessageViewContainer() {
  const [borderColor] = useState("rgba(62, 73, 174, 0.2)");

  const {
    backgroundColor,
    textColor,
    borderRadius,
    setShowMessages,
    showMessages,
  } = useInputConfigContext();

  const { loading, messages } = useMessageContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const eventTarget = event.target as HTMLElement;

      if (
        eventTarget.closest(".message-list") ||
        eventTarget.closest(".show-messages-button") ||
        eventTarget.closest(".custom-textarea")
      ) {
        return;
      } else if (showMessages) {
        setShowMessages(false);
      }
    };

    if (showMessages) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative p-4"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: `${borderRadius}px`,
        borderColor: borderColor,
      }}
    >
      <button
        className="absolute top-1 right-1 "
        style={{
          color: textColor,
        }}
        onClick={() => setShowMessages(false)}
      >
        <XMarkIcon className="h-6 w-6" color={textColor} />
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
