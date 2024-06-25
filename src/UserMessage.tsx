import { Message } from "./types/Message";

// define the type for our component's props
type Props = {
  message: Message;
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
