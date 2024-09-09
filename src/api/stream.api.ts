import { AssistantStreamEvent } from "openai/resources/beta/assistants";

const baseApi = process.env.REACT_APP_API_URL;

export function streamEvents({
  messageId,
  onEvent,
  onError,
  onEnd,
  threadId,
}: {
  messageId: string;
  onEvent?: (data: AssistantStreamEvent) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
  threadId?: string;
}) {
  const eventSource = new EventSource(
    baseApi +
      `/sms/stream/${messageId}${threadId ? "?threadId=" + threadId : ""}`
  );

  // Handle incoming events
  eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (onEvent) onEvent(data);
    if (data.event === "thread.run.completed") {
      console.log("Thread run completed");
      onEnd && onEnd();
      eventSource.close();
    }
  };

  // Handle errors
  eventSource.onerror = function (error) {
    console.error("Error receiving events:", error);
    if (onError) onError(error);
    // eventSource.close(); // Optionally close the connection on error
  };

  // Handle the end of the stream
  eventSource.addEventListener("end", function () {
    console.log("Stream ended.");
    if (onEnd) onEnd();
    eventSource.close();
  });

  // Return the eventSource object so it can be closed externally if needed
  return eventSource;
}
