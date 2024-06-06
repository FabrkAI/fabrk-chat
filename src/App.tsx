import "./App.css";
import MessageListContainer from "./components/MessageListContainer";
import { CampaignContextWrapper } from "./hooks/CampaignContext";
import { MessageContextWrapper } from "./hooks/MessageContext";
import { SessionContextWrapper } from "./hooks/SessionContext";

function App() {
  return (
    <SessionContextWrapper>
      <CampaignContextWrapper>
        <MessageContextWrapper>
          <MessageListContainer />
        </MessageContextWrapper>
      </CampaignContextWrapper>
    </SessionContextWrapper>
  );
}

export default App;
