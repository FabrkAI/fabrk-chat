/* eslint-disable react/jsx-pascal-case */
import MessageInput from "../MessageInput";
import {
  InputConfigContextWrapper,
  useInputConfigContext,
} from "../hooks/InputConfigContext";
import { useMessageContext } from "../hooks/MessageContext";
import { useScreenSize } from "../hooks/ScreenSizeContext";
import MessageViewContainer from "./MessageViewContainer";

function _MessageListContainer() {
  const { messages } = useMessageContext();
  const { data, showMessages, loading } = useInputConfigContext();

  const { width, borderRadius } = data || {};

  const screenSize = useScreenSize();

  return (
    <div className="flex-1 flex flex-col min-h-screen items-center">
      <div
        className="flex-1 flex flex-col justify-end p-4 w-full gap-5"
        style={{
          width:
            width && screenSize.width > Number(width) ? `${width}px` : "100%",
          margin: "4px 4px 4px 4px",
        }}
      >
        {messages && messages.length > 0 && (
          <div
            className="flex flex-col-reverse overflow-y-auto max-h-[calc(100vh-150px)]"
            style={{
              borderRadius: `${borderRadius}px`,
              marginBottom: "100px", // Ensure space for the input
            }}
          >
            {showMessages && <MessageViewContainer />}
          </div>
        )}
        {!loading && data && <MessageInput />}
      </div>
    </div>
  );
}

const MessageListContainer = () => {
  return (
    <InputConfigContextWrapper>
      <_MessageListContainer />
    </InputConfigContextWrapper>
  );
};

export default MessageListContainer;
