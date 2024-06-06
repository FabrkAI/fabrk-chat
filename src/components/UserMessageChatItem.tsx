import { SmsMessage } from "../api/sms.type";
import { useInputConfigContext } from "../hooks/InputConfigContext";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function UserMessageChatItem({
  message,
  showBadges,
}: {
  message: SmsMessage;
  showBadges: boolean;
}) {
  const { backgroundColor, textColor, borderRadius } = useInputConfigContext();

  return (
    <div className="flex justify-end mr-10">
      <div
        className="bg-gray-900 text-white p-2 rounded-lg max-w-lg"
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
        {!showBadges && (
          <p className="text-xs text-white">
            {formatTimeStampToHumanReadableDateTimeSeconds(message.created_at)}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserMessageChatItem;
