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

  const { width, borderRadius } = useInputConfigContext();

  return (
    <div className="flex-1 flex flex-col min-h-screen ">
      <div className="flex-1 flex flex-col">
        {messages && messages.length > 0 && (
          <div className="flex-1 flex flex-col gap-5 justify-end p-4">
            <div
              className="flex flex-col-reverse overflow-y-auto max-h-[calc(100vh-150px)] justify-end"
              style={{
                borderRadius: `${borderRadius}px`,
                width: `${width}px`,
                margin: "0 auto",
              }}
            >
              {true && <MessageViewContainer />}
            </div>

            <div className="mt-8 w-full max-w-2xl flex flex-col gap-5">
              <MessageInput />
            </div>
          </div>
        )}
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
