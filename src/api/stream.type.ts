import { TextDeltaBlock } from "openai/resources/beta/threads/messages";

// Type guard to check if content is of type MessageContentDelta
export function isMessageContentDelta(content: any): content is TextDeltaBlock {
  return content && typeof content.text === "object" && "value" in content.text;
}
