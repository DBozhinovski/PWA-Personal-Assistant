interface CHProps {
  messages: Array<{
    message: string;
    owner: 'me' | 'bot';
  }>
}

export const ChatHistory = (props: CHProps) => {
  return (<div className="chat-history">
    {props.messages.map(m => {
      return (
        <p className={`message-${m.owner}`}>
          {m.message}
        </p>
      )
    })}
  </div>);
}