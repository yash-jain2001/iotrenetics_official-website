import { Bubble } from "@typebot.io/react";

const ChatBot = () => {
  return (
    <Bubble
      typebot="customer-support-esg6p5c"
      apiHost="https://viewer.typebot.io"
      previewMessage={{ message: "I have a question for you!" }}
      theme={{
        button: { backgroundColor: "#1D1D1D", size: "medium" },
        chatWindow: {
          backgroundColor: "#ffffff",
          maxWidth: "380px",
          maxHeight: "520px",
        },
      }}
    />
  );
};

export default ChatBot;