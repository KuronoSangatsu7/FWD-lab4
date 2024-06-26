
// define the type for our component's props
type Props = {
  message: string,
};

function UserMessage(props: Props) {
  console.log(props.message)
  return (
    <li style={{ fontWeight: "bold" }}>
      {props.message}
    </li>
  );
}

export default UserMessage;