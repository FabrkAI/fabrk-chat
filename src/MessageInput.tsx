import { ArrowRightIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useMessageContext } from "./hooks/MessageContext";
import { useInputConfigContext } from "./hooks/InputConfigContext";
import { useScreenSize } from "./hooks/ScreenSizeContext";

function MessageInput() {
  const { handleCreateMessage } = useMessageContext();
  const { showMessages, setShowMessages } = useInputConfigContext();

  const [inputValue, setInputValue] = useState("");
  const [borderColor, setBorderColor] = useState("rgba(62, 73, 174, 0.2)");

  const handleMouseEnter = () => setBorderColor("rgba(62, 73, 174, 0.5)");
  const handleMouseLeave = () => setBorderColor("rgba(62, 73, 174, 0.2)");
  const handleFocus = () => setBorderColor("rgba(62, 73, 174, 0.5)");
  const handleBlur = () => setBorderColor("rgba(62, 73, 174, 0.2)");

  const { data } = useInputConfigContext();

  const { backgroundColor, color, width, borderRadius } = data || {};

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCreateMessage(inputValue);
    setInputValue("");
    setShowMessages(true);
  }

  const screenSize = useScreenSize();

  return (
    <div className="flex justify-center relative" style={{ zIndex: 15 }}>
      <style>
        {`
          .custom-textarea::placeholder {
            color: ${color};
          }
        `}
      </style>
      {!showMessages && (
        <button
          className="fixed bottom-28 left-1/2 transform -translate-x-1/2 show-messages-button"
          onClick={() => setShowMessages(true)}
          style={{
            backgroundColor,
            color,
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            padding: "4px",
          }}
        >
          <ChevronDoubleUpIcon className="h-4 w-4" fill={color} />
        </button>
      )}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full sm:w-1/2 sm:left-1/2 sm:transform -translate-x-1/2"
        style={{
          width:
            width && screenSize.width > Number(width) ? `${width}px` : "100%",
        }}
      >
        <div
          className={`flex flex-row items-center overflow-auto max-h-[45vh] outline-none ${borderRadius} shadow-lg`}
          style={{
            height: "56px",
            backgroundColor: backgroundColor || "#252222",
            color,
            borderRadius: `${borderRadius}px`,
            borderColor: borderColor,
            margin: "4px 4px 4px 4px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <textarea
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Send message..."
            className="outline-none border-none resize-none focus:outline-none focus:border-none p-2 w-full custom-textarea"
            autoComplete="off"
            autoFocus={false}
            style={{
              height: "56px",
              color,
              borderRadius: `${borderRadius}px`,
              backgroundColor: backgroundColor || "#252222",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button
            type="submit"
            className="m-1 outline-none duration-300 relative justify-center text-center items-center rounded-full cursor-pointer inline-flex text-sm h-8"
            style={{
              backgroundColor,
              color,
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            }}
          >
            <div className="flex items-center leading-none justify-center gap-xs">
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </button>
        </div>
        <div
          className="text-center w-fit items-center justify-center flex p-1"
          style={{
            color,
            fontSize: "9px",
            backgroundColor: backgroundColor || "#252222",
            margin: "1px auto",
            borderRadius: `${borderRadius}px`,
          }}
        >
          <p>
            Woven with 🧡 by{" "}
            <a
              href="https://fabrk.ai"
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
              }}
              target="_blank"
              rel="noreferrer"
            >
              Fabrk.ai
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
