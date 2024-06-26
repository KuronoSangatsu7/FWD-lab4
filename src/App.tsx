import React from "react";
import "./App.css";
// import types
import { Message } from "./types/message.tsx";
// import components
import UserMessage from "./components/UserMessage.tsx";
import Form from "./components/Form.tsx";
// import socket.io client module
import { io } from "socket.io-client";

function App() {
  const [messages, setMessages] = React.useState<string[]>([]);

  // connect to web-socket api
  const socket = io("https://fwd.innopolis.university");

  // effect to execute each time 'messages' state is updated
  React.useEffect(() => {
    // define socket events handlers
    function onMessage(msg: string) {
      console.log([...messages, msg]);
      setMessages([...messages, msg]);
    }

    // define socket listenners
    socket.on("chat message", onMessage);

    // clean listenners on component unmount
    return () => {
      socket.off("chat message", onMessage);
    };
  }, [messages]);

  function sendMessage(msg: Message) {
    console.log("name", msg);
    socket.emit("chat message", `${msg.username}: ${msg.message}`);
  }

  return (
    <>
      {messages.length > 0 &&
        messages.map((message, key) => (
          <UserMessage message={message} key={key} />
        ))}

      <Form getFormInput={sendMessage} />
    </>
  );
}

export default App;