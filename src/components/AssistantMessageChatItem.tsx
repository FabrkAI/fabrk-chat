import Markdown from "react-markdown";
import { SmsMessage } from "../api/sms.type";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function AssistantMessageChatItem({ message }: { message: SmsMessage }) {
  const { data } = useInputConfigContext();

  const { color } = data || {};

  return (
    <div className="flex justify-start relative">
      <div
        className="text-white p-2 max-w-lg"
        style={{
          color,
        }}
      >
        <Markdown>{message.content}</Markdown>
        <p
          style={{
            color,
            fontSize: "9px",
          }}
        >
          {formatTimeStampToHumanReadableDateTimeSeconds(message.created_at)}
        </p>
      </div>
    </div>
  );
}

export default AssistantMessageChatItem;
