/* eslint-disable react/jsx-pascal-case */
import MessageInput from "../MessageInput";
import { useCampaignContext } from "../hooks/CampaignContext";
import {
  InputConfigContextWrapper,
  useInputConfigContext,
} from "../hooks/InputConfigContext";
import { useMessageContext } from "../hooks/MessageContext";
import MessageViewContainer from "./MessageViewContainer";

function _MessageListContainer() {
  const { messages } = useMessageContext();
  const { width, borderRadius, showMessages } = useInputConfigContext();

  return (
    <div className="flex-1 flex flex-col min-h-screen items-center">
      <div
        className="flex-1 flex flex-col justify-end p-4 w-full gap-5"
        style={{ width: width ? `${width}px` : "100%" }}
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
        <MessageInput />
      </div>
    </div>
  );
}

const MessageListContainer = () => {
  const { campaign } = useCampaignContext();
  return (
    <InputConfigContextWrapper companyId={campaign?.company_id as string}>
      <_MessageListContainer />
    </InputConfigContextWrapper>
  );
};

export default MessageListContainer;
