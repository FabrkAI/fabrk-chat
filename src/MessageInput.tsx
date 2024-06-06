import { ArrowRightIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useMessageContext } from "./hooks/MessageContext";
import { useInputConfigContext } from "./hooks/InputConfigContext";

function MessageInput() {
  const { handleCreateMessage } = useMessageContext();
  const { showMessages, setShowMessages } = useInputConfigContext();

  const [inputValue, setInputValue] = useState("");
  const [borderColor, setBorderColor] = useState("rgba(62, 73, 174, 0.2)");

  const handleMouseEnter = () => setBorderColor("rgba(62, 73, 174, 0.5)");
  const handleMouseLeave = () => setBorderColor("rgba(62, 73, 174, 0.2)");
  const handleFocus = () => setBorderColor("rgba(62, 73, 174, 0.5)");
  const handleBlur = () => setBorderColor("rgba(62, 73, 174, 0.2)");

  const { backgroundColor, textColor, width, borderRadius } =
    useInputConfigContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCreateMessage(inputValue);
    setInputValue("");
  }

  return (
    <div
      className="flex justify-center z-15 relative"
      style={{
        zIndex: 15,
      }}
    >
      {!showMessages && (
        <button
          className="fixed bottom-28 left-1/2 transform -translate-x-1/2 show-messages-button"
          onClick={() => setShowMessages(true)}
        >
          <ChevronDoubleUpIcon className="h-6 w-6" fill={textColor} />
        </button>
      )}
      <form
        onSubmit={handleSubmit}
        className={
          "fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full  sm:w-1/2 sm:left-1/4 sm:transform-none"
        }
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-row items-center pb-sm overflow-auto max-h-[45vh]  outline-none  ${borderRadius}`}
            style={{
              height: "56px",
              border: "none",
              outline: "none",
              boxShadow: "none",
              width: width ? `${width}px` : "100%",
              backgroundColor: backgroundColor || "#252222",
              color: textColor,
              borderRadius: `${borderRadius}px`,
              borderColor: borderColor,
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
              className="outline-none border-none resize-none  focus:outline-none focus:border-none p-2"
              autoComplete="off"
              autoFocus={false}
              style={{
                height: "56px",
                border: "none",
                outline: "none",
                boxShadow: "none",
                width: width ? `${width}px` : "100%",
                color: textColor,
                borderRadius: `${borderRadius}px`,
                backgroundColor: backgroundColor || "#252222",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className="m-1 outline-none  duration-300   relative justify-center text-center items-center rounded-full cursor-pointer  inline-flex text-sm h-8"
              style={{
                backgroundColor,
                color: textColor,
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
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
