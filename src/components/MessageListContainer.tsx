/* eslint-disable react/jsx-pascal-case */
import MessageInput from "../MessageInput";
import { FileUploadContextWrapper } from "../hooks/FileUploadContext";
import {
  InputConfigContextWrapper,
  useInputConfigContext,
} from "../hooks/InputConfigContext";
import { useMessageContext } from "../hooks/MessageContext";
import MessageViewContainer from "./MessageViewContainer";

function _MessageListContainer() {
  const { messages } = useMessageContext();
  const { showMessages, loading } = useInputConfigContext();

  return (
    <div className="flex-1 flex flex-col min-h-screen items-center w-full">
      <div className="flex-1 flex flex-col justify-end p-4 w-full gap-5">
        {messages && messages.length > 0 && (
          <div
            className="flex flex-col-reverse  max-h-screen"
            style={{
              height: "100%",
              overflowY: "visible",
            }}
          >
            {showMessages && <MessageViewContainer />}
          </div>
        )}
        {!loading && <MessageInput />}
      </div>
    </div>
  );
}

const MessageListContainer = () => {
  return (
    <InputConfigContextWrapper>
      <FileUploadContextWrapper>
        <_MessageListContainer />
      </FileUploadContextWrapper>
    </InputConfigContextWrapper>
  );
};

export default MessageListContainer;
