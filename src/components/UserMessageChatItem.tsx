import { SmsMessage } from "../api/sms.type";
import { formatTimeStampToHumanReadableDateTimeSeconds } from "../utils/parseTimeStamp";

function UserMessageChatItem({ message }: { message: SmsMessage }) {
  return (
    <div className="flex justify-end mr-10">
      <div className="p-2 rounded-lg max-w-lg bg-slate-200">
        <p>{message.content}</p>

        <p
          style={{
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
