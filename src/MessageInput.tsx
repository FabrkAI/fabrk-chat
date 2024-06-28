/* eslint-disable react-hooks/exhaustive-deps */
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import FileUploadInput from "./components/FileUploadInput";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCampaignContext } from "./hooks/CampaignContext";
import { useFileUploadContext } from "./hooks/FileUploadContext";
import { useInputConfigContext } from "./hooks/InputConfigContext";
import { useMessageContext } from "./hooks/MessageContext";
import { useScreenSize } from "./hooks/ScreenSizeContext";
import useTypingPlaceholder from "./hooks/placeholderMarquee";

function MessageInput() {
  const { handleCreateMessage } = useMessageContext();

  const {
    handleOpenFileSelect,
    file,
    hiddenFileInput,
    handleChange,
    uploadOneFile,
    createdFileStore,
    loading,
  } = useFileUploadContext();

  const { campaign } = useCampaignContext();

  const [fileName, setFileName] = useState("");

  const { showMessages, setShowMessages, placeholders } =
    useInputConfigContext();

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
    handleCreateMessage(inputValue, createdFileStore?.id);
    setInputValue("");
    setFileName("");
    setShowMessages(true);
  }

  const displayedPlaceholder = useTypingPlaceholder(
    placeholders?.messages || ["Send Message..."]
  );

  const screenSize = useScreenSize();

  const fileTypes = [
    ".csv",
    ".xls",
    ".xlsx",
    ".pptx",
    ".pdf",
    ".docx",
    ".doc",
    ".txt",
    ".md",
    ".json",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
  ];

  useEffect(() => {
    if (file) {
      setFileName(file.name);
      uploadOneFile({
        file,
        additionalData: {
          companyId: campaign?.company_id,
          location: "images",
        },
      });
    }
  }, [file]);

  return (
    <div
      className="flex flex-col justify-center items-center relative"
      style={{ zIndex: 15 }}
    >
      <style>
        {`
          .custom-textarea::placeholder {
            color: ${color};
          }
        `}
      </style>
      {!showMessages && !loading && (
        <button
          className="show-messages-button text-center items-center justify-center"
          onClick={() => setShowMessages(true)}
          style={{
            backgroundColor,
            color,
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            padding: "1px",
          }}
        >
          <ChevronDoubleUpIcon className="h-4 w-4" fill={color} />
        </button>
      )}
      {fileName && (
        <div className="mb-2">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div
              className="text-sm text-gray-600 p-1 w-fit px-2  "
              style={{
                color,
                backgroundColor: backgroundColor || "#252222",
                borderRadius: `${borderRadius}px`,
                boxShadow: "0 8px 24px rgba(255, 140, 0, 0.6)",
              }}
            >
              {/* @ts-ignore */}
              <Typography>Uploaded file: {fileName}</Typography>
            </div>
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          width:
            width && screenSize.width > Number(width) ? `${width}px` : "100%",
          height: "fit-content",
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
            margin: "0px 4px 4px 4px",
            boxShadow: "0 8px 24px rgba(255, 140, 0, 0.6)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <textarea
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder={
              fileName && loading ? "Uploading file..." : displayedPlaceholder
            }
            className="outline-none border-none resize-none focus:outline-none focus:border-none p-2 w-full custom-textarea"
            autoComplete="off"
            autoFocus={false}
            disabled={loading}
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
            className="m-1 outline-none duration-300 relative justify-center text-center items-center rounded-full cursor-pointer  inline-flex text-sm h-8"
            style={{
              backgroundColor,
              color,
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleOpenFileSelect(e);
            }}
          >
            <div className="flex items-center leading-none justify-center gap-xs">
              <PlusCircleIcon className="h-6 w-6" />
            </div>
          </button>
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
      <FileUploadInput
        handleChange={handleChange}
        hiddenFileInput={hiddenFileInput}
        accept={fileTypes.join(",")}
        multiple={false}
      />
    </div>
  );
}

export default MessageInput;
