import React from "react";
import { Message } from "../types/message";

// denfine the type for the component's props

interface Props {
  getFormInput: (message: Message) => void;
}

export default function Form(props: Props) {
  // use React to declare our component's states
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  // form submit handler
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent default html form submit behavior

    // call parent method, passing it the form-values
    props.getFormInput({
      username: name,
      message: message,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        autoComplete="off"
        placeholder="Name"
        style={{ flexGrow: 0 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.currentTarget.value);
        }}
      />

      <input
        value={message}
        autoComplete="off"
        placeholder="Type your message..."
        style={{ flexGrow: 0 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(e.currentTarget.value);
        }}
      />

      <button type="submit">Send</button>
    </form>
  );
}
