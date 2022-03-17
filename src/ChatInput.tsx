interface CIProps {
  message: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}

export const ChatInput = (props: CIProps) => {
  return (
    <div className="chat-input">
      <form onSubmit={(e) => {
        e.preventDefault();
        props.onChange('');
        props.onSubmit();
      }}>
        <input type="text" value={props.message} onInput={(e) => props.onChange(e.currentTarget.value)} />
        <button>▶️</button>
      </form>
    </div>
  );
}