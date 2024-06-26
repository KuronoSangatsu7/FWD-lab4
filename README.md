## React Review

As a refresher of the concepts studied, make sure to check out the official documentation [[Quick Start – React](https://react.dev/learn) which has more information than you will need to develop React applications. You can also learn how to use React with typescript [[Using TypeScript with React](https://react.dev/learn/typescript)].

You can equally learn the basics of ReactJs with some fun while learning how to create a Tic-Tac-Toe game
[Tutorial: Tic-Tac-Toe – React](https://react.dev/learn/tutorial-tic-tac-toe)

If you are using VS Code, install the [React Extension](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) to get syntax highlighting and IntelliSense support.

To create a new React project that supports TypeScript, you can run the following commands (replacing `my-app` with your app's name):

```

npm create vite@latest my-app

```

In the interactive prompt, select React first, then TypeScript. Now, just run `cd my-app` to get into the app directory and then `npm install` and then `npm run dev` to open a development server. We no longer need the "Live Server" extension!

### Vite

Note that this time, we're using a new bundler instead of Rollup: Vite. Vite actually uses Rollup under the hood when building for production, and ESBuild during development to speed up boot times.

The main differences with Vite are that it is configured out-of-the-box with the following [features](https://vitejs.dev/guide/features.html):

- NPM dependency resolution and pre-bundling

- TypeScript support (compilation only, not type-checking)

- Hot Module Replacement

- Importing CSS and static assets (images, JSON, ...)

- and lots more..

## Task

To practice some React, let us rewrite the task of the previous lab (real-time chat app) using React and RFCs.

Let's start by defining the styles of the application, in the App.css file :

**`App.css`**:

```css
/* message listing styles */
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 0.5rem 1rem;
}

li:nth-child(odd) {
  background-color: #f8f8f8;
}

/* input component styles */
form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}

input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}

input:focus {
  outline: none;
}

form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}
```

Now, we define a type for messages that will be used elsewhere:

**`message.ts`**:

```javascript
export interface Message {
  username: string;
  message: string;
}
```

Then, we encapsulate the message in a reusable component called UserMessage :

**`UserMessage.tsx`**:

```javascript
import { Message } from "./message";

// define the type for our component's props
type Props = {
  message: Message,
};

function UserMessage(props: Props) {
  return (
    <li style={{ fontWeight: "bold" }}>
      <span>{props.message.username}:</span>
      {props.message.message}
    </li>
  );
}

export default UserMessage;
```

And then define another component for the message Form at the bottom

**`Form.tsx`**:

````javascript
import React from "react";
import { Message } from "./message";

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

````

And then, to put it all together:

**`App.tsx`**:

```javascript
import React from "react";
import "./App.css";
// import types
import { Message } from "./message.tsx";
// import components
import UserMessage from "./UserMessage.tsx";
import Form from "./Form.tsx";
// import socket.io client module
import { io } from "socket.io-client";

function App() {
  const [messages, setMessages] = React.useState<Message[]>([]);

  // connect to web-socket api
  const socket = io("https://fwd.innopolis.university");

  // effect to execute each time 'messages' state is updated
  React.useEffect(() => {
    // define socket events handlers
    function onMessage(msg: Message) {
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
    socket.emit("chat message", msg);
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
```

And that's all!

## Homework

Take the same website you've been working on for the past assignments and transform it to use React with TypeScript. The components themselves will depend on the nature of your website, but it is expected that a minimum of 3 components will be used.