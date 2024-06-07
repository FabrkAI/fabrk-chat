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
        <p
          style={{
            fontFamily: "dm-mono-regular",
          }}
        >
          {message.content}
        </p>

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

export default UserMessageChatItem;
