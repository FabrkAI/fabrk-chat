import "./App.css";
import MessageListContainer from "./components/MessageListContainer";
import { CampaignContextWrapper } from "./hooks/CampaignContext";
import { MessageContextWrapper } from "./hooks/MessageContext";
import { SessionContextWrapper } from "./hooks/SessionContext";
import { EventStreamingWrapper } from "./hooks/StreamMessageContext";

function App() {
  return (
    <CampaignContextWrapper>
      <SessionContextWrapper>
        <EventStreamingWrapper>
          <MessageContextWrapper>
            <MessageListContainer />
          </MessageContextWrapper>
        </EventStreamingWrapper>
      </SessionContextWrapper>
    </CampaignContextWrapper>
  );
}

export default App;
