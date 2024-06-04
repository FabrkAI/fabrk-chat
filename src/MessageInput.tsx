import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

function MessageInput() {
  // const { handleCreateMessage } = useFabrkMessageContext();
  const [inputValue, setInputValue] = useState("");
  const [borderColor, setBorderColor] = useState("rgba(62, 73, 174, 0.2)");

  const bgColor = "#f9f9f9";
  const width = 800;
  const borderRadius = "25";
  const textColor = "#000";

  const handleMouseEnter = () => setBorderColor("rgba(62, 73, 174, 0.5)");
  const handleMouseLeave = () => setBorderColor("rgba(62, 73, 174, 0.2)");
  const handleFocus = () => setBorderColor("rgba(62, 73, 174, 0.5)");
  const handleBlur = () => setBorderColor("rgba(62, 73, 174, 0.2)");

  // const { bgColor, textColor, width, borderRadius } = useInputConfigContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // handleCreateMessage(inputValue);
    setInputValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        "fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full md:max-w-[800px] p-4 sm:w-1/2 sm:left-1/4 sm:transform-none"
      }
    >
      <div
        className={`flex flex-row items-center pb-sm overflow-auto max-h-[45vh] ${borderRadius} p-2 border border-solid border-transparent transition duration-300`}
        style={{
          height: "56px",

          width: `${width}px`,
          backgroundColor: bgColor,
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
          className="resize-none p-2 w-full h-full bg-transparent "
          autoComplete="off"
          autoFocus={false}
          style={{
            height: "56px",
            border: "none",
            outline: "none",
            width: `${width}px`,
            backgroundColor: bgColor,
            color: textColor,
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
          className="m-1  outline-none outline-transparent transition duration-300 font-sans items-center relative justify-center text-center items-center rounded-full cursor-pointer opacity-50 inline-flex text-sm h-8"
        >
          <div className="flex items-center leading-none justify-center gap-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
