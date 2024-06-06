import Markdown from "react-markdown";
import { SmsMessage } from "../api/sms.type";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function AssistantMessageChatItem({ message }: { message: SmsMessage }) {
  return (
    <div className="flex justify-start relative">
      <div className="text-white p-2 max-w-lg">
        <Markdown>{message.content}</Markdown>
        <p className="text-xs text-white">
          {formatTimeStampToHumanReadableDateTimeSeconds(message.created_at)}
        </p>
      </div>
    </div>
  );
}

export default AssistantMessageChatItem;
