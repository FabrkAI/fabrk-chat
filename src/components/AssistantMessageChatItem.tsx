import Markdown from "react-markdown";
import { SmsMessage } from "../api/sms.type";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function AssistantMessageChatItem({ message }: { message: SmsMessage }) {
  const { textColor } = useInputConfigContext();

  return (
    <div className="flex justify-start relative">
      <div
        className="text-white p-2 max-w-lg"
        style={{
          color: textColor,
        }}
      >
        <Markdown>{message.content}</Markdown>
        <p
          className="text-xs"
          style={{
            color: textColor,
          }}
        >
          {formatTimeStampToHumanReadableDateTimeSeconds(message.created_at)}
        </p>
      </div>
    </div>
  );
}

export default AssistantMessageChatItem;
