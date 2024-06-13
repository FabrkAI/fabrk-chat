import { SmsMessage } from "../api/sms.type";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function UserMessageChatItem({ message }: { message: SmsMessage }) {
  const { backgroundColor, textColor, borderRadius } = useInputConfigContext();

  return (
    <div className="flex justify-end mr-10">
      <div
        className="p-2 rounded-lg max-w-lg"
        style={{
          backgroundColor,
          color: textColor,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <p>{message.content}</p>

        <p
          style={{
            color: textColor,
            fontSize: "9px",
          }}
        >
          {formatTimeStampToHumanReadableDateTimeSeconds(message.created_at)}
        </p>
      </div>
    </div>
  );
}

export default UserMessageChatItem;
