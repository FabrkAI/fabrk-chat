/* eslint-disable react/jsx-pascal-case */
import MessageInput from "../MessageInput";
import { FileUploadContextWrapper } from "../hooks/FileUploadContext";

import { useMessageContext } from "../hooks/MessageContext";
import MessageViewContainer from "./MessageViewContainer";

function _MessageListContainer() {
  const { messages, showMessages } = useMessageContext();

  return (
    <div className="flex-1 flex flex-col min-h-screen  w-full">
      <div className="flex-1 flex flex-col justify-end p-4 w-full gap-5 items-center">
        {messages && messages.length > 0 && (
          <div
            className="flex flex-col-reverse max-h-screen max-w-[1200px] w-full"
            style={{
              height: "100%",
              overflowY: "visible",
            }}
          >
            {showMessages && <MessageViewContainer />}
          </div>
        )}
        <MessageInput />
      </div>
    </div>
  );
}

const MessageListContainer = () => {
  return (
    <FileUploadContextWrapper>
      <_MessageListContainer />
    </FileUploadContextWrapper>
  );
};

export default MessageListContainer;
