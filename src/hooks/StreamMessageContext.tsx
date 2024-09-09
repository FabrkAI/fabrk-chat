/* eslint-disable react-hooks/exhaustive-deps */
import { AssistantStreamEvent } from "openai/resources/beta/assistants";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { isMessageContentDelta } from "../api/stream.type";
import { streamEvents } from "../api/stream.api";

type EventStreamingContextType = {
  events: AssistantStreamEvent[];
  text: string;
  streaming: boolean;
  startStreaming: (messageId: string) => void;
  stopStreaming: () => void;
  eventSource: EventSource | null;
  setText: (text: string) => void;
};

export const EventStreamingWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<AssistantStreamEvent[]>([]);
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const startStreaming = useCallback((messageId: string) => {
    if (messageId) {
      setStreaming(true);
      const source = streamEvents({
        messageId,
        onEvent: (data: AssistantStreamEvent) => {
          setEvents((prevEvents) => [...prevEvents, data]);

          if (data.event === "thread.run.completed") {
            source.close();
          }

          if (data.event === "thread.message.delta") {
            if (data?.data.delta?.content && data?.data.delta?.content[0]) {
              const content = data.data.delta.content[0];

              if (isMessageContentDelta(content)) {
                setText((prevText) => prevText + content?.text?.value);
              }
            }
          }
        },
        onError: (error) => console.error("Stream Error:", error),
        onEnd: () => {
          stopStreaming();
          console.log("Stream has ended.");
        },
      });
      setEventSource(source);
    }
  }, []);

  const stopStreaming = () => {
    if (eventSource) {
      eventSource.close();
    }
    setStreaming(false);
    setEventSource(null);
  };

  return (
    <EventStreamingContext.Provider
      value={{
        eventSource,
        events,
        text,
        streaming,
        startStreaming,
        stopStreaming,
        setText,
      }}
    >
      {children}
    </EventStreamingContext.Provider>
  );
};

const EventStreamingContext = createContext<
  EventStreamingContextType | undefined
>({
  events: [],
  text: "",
  streaming: false,
  startStreaming: () => {},
  stopStreaming: () => {},
  eventSource: null,
  setText: () => {},
});

export const useEventStreaming = () => useContext(EventStreamingContext)!;
