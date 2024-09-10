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
import useTypingPlaceholder from "./hooks/placeholderMarquee";
import { useEventStreaming } from "./hooks/StreamMessageContext";

function MessageInput() {
  const { handleCreateMessage, newMessage, getUpdatedMessages, setNewMessage } =
    useMessageContext();
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

  const { startStreaming, streaming } = useEventStreaming();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCreateMessage({
      content: inputValue,
      fileStoreId: createdFileStore?.id,
    });
    setInputValue("");
    setFileName("");
  }

  useEffect(() => {
    if (newMessage) {
      startStreaming(newMessage.id);
      setNewMessage(undefined);
    }
  }, [newMessage]);

  useEffect(() => {
    if (!streaming && !newMessage) {
      setTimeout(() => {
        getUpdatedMessages();
      }, 2000);
    }
  }, [streaming]);

  const displayedPlaceholder = useTypingPlaceholder(
    placeholders?.messages || ["Send Message..."]
  );

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
      className="custom-textarea flex flex-col justify-center items-center relative border-1 "
      style={{ zIndex: 15 }}
    >
      {!showMessages && !loading && (
        <button
          className="show-messages-button text-center items-center justify-center"
          onClick={() => setShowMessages(true)}
          style={{
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            padding: "1px",
          }}
        >
          <ChevronDoubleUpIcon className="h-4 w-4" />
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
                boxShadow: "0 8px 24px rgba(255, 140, 0, 0.6)",
              }}
            >
              {/* @ts-ignore */}
              <Typography>Uploaded file: {fileName}</Typography>
            </div>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="group flex flex-row items-center rounded-md border-2 border-skin-muted shadow-sm focus-within:border-2 focus-within:border-skin-accent p-2 max-h-[45vh] min-w-[600px] w-full ">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={displayedPlaceholder}
            className="block w-full resize-none rounded-none rounded-l-md border-0 bg-skin-hover py-1.5 text-skin-base  outline-none placeholder:text-skin-muted focus:text-skin-base focus:ring-0 sm:text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && handleSubmit) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />

          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-skin-hover px-2 py-2 text-sm font-semibold text-skin-base ring-inset hover:bg-skin-hover"
            onClick={(e) => {
              e.preventDefault();
              handleOpenFileSelect(e);
            }}
          >
            <PlusCircleIcon className="h-6 w-6 text-skin-muted" />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-skin-hover px-2 py-2 text-sm font-semibold text-skin-base  ring-inset hover:bg-skin-hover"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as any);
            }}
          >
            <ArrowRightIcon className="h-6 w-6 rounded-full text-skin-muted" />
          </button>
        </div>
        <div
          className="text-center w-fit items-center justify-center flex p-1"
          style={{
            fontSize: "9px",
            margin: "1px auto",
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
