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

  const [showBadges] = useState(false);

  const {
    backgroundColor,
    textColor,
    borderRadius,
    setShowMessages,
    showMessages,
  } = useInputConfigContext();

  const { loading, messages } = useMessageContext();

  const [activeMessageId, setActiveMessageId] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const eventTarget = event.target as HTMLElement;

      if (
        eventTarget.closest(".message-list") ||
        eventTarget.closest(".show-messages-button")
      ) {
        return;
      } else if (showMessages) {
        setShowMessages(false);
      }

      if (eventTarget.closest(".badge-button")) {
        return;
      }

      setActiveMessageId("");
    };

    if (activeMessageId || showMessages) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeMessageId]);

  return (
    <div
      className="w-full max-w-[800px] bg-gray-100 dark:bg-black p-4 overflow-scroll mx-auto max-h-screen my-10 relative message-list"
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: `${borderRadius}px`,
        borderColor: borderColor,
      }}
    >
      <button
        className="absolute top-4 right-4 "
        onClick={() => setShowMessages(false)}
      >
        <XMarkIcon className="h-6 w-6" color="orange" />
      </button>
      {messages?.map((message, index) => {
        if (message.role === "user") {
          return (
            <div key={index}>
              <UserMessageChatItem message={message} showBadges={showBadges} />
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
