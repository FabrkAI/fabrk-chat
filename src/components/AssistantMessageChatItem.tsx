import Markdown from "react-markdown";
import { SmsMessage } from "../api/sms.type";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function AssistantMessageChatItem({ message }: { message: SmsMessage }) {
  return (
    <div className="flex justify-start relative">
      <div className="p-2 max-w-2xl">
        <Markdown>{message.content}</Markdown>
        <p
          style={{
            fontSize: "9px",
          }}
        >
          {message.created_at &&
            formatTimeStampToHumanReadableDateTimeSeconds(message.created_at)}
        </p>
      </div>
    </div>
  );
}

export default AssistantMessageChatItem;
