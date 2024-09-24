import "./App.css";
import MessageListContainer from "./components/MessageListContainer";
import { AgentContextWrapper } from "./hooks/AgentContext";
import { MessageContextWrapper } from "./hooks/MessageContext";
import { SessionContextWrapper } from "./hooks/SessionContext";
import { EventStreamingWrapper } from "./hooks/StreamMessageContext";

function App() {
  return (
    <AgentContextWrapper>
      <SessionContextWrapper>
        <EventStreamingWrapper>
          <MessageContextWrapper>
            <MessageListContainer />
          </MessageContextWrapper>
        </EventStreamingWrapper>
      </SessionContextWrapper>
    </AgentContextWrapper>
  );
}

export default App;
