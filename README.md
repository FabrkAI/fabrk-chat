# Fabrk Chat

## Getting Started

This project is a chat application built with React and Tailwind CSS.

### Prerequisites

- Node.js (v14 and above)
- Yarn (package manager)

### Installation

1. Clone the repository:
   ```bash
git clone https://github.com/yourusername/fabrk-chat.git
cd fabrk-chat
```

2. Install dependencies:
   ```bash
yarn install
```

### Running the App

To start the application, run:

```bash
yarn start
```

This will start the development server. Open your browser and go to `http://localhost:3000`. 
### Functionality Overview

The Fabrk Chat application is built using React and makes extensive use of context to manage its state and behaviors.

**Key Features:**
- **Agent Context:** Manages interactions with agents, allowing users to communicate with them through the chat interface.
- **Session Management:** Maintains user sessions, ensuring that the user experience is seamless across different interactions.
- **Event Streaming:** Supports real-time communication, updating the chat view as new messages are received.
- **Message Management:** Handles the input, display, and storage of messages within the chat.

The application structure leverages hooks and context providers to keep state management clean and maintainable, promoting reusable components across the app.

