import { useState } from 'preact/hooks';

import ReloadPrompt from './ReloadPrompt';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';

export function App() {
  const [message, setMessage] = useState<string>('')

	return (
		<div className="chat-root">
      <ReloadPrompt />
			<ChatHistory messages={[]} />
      <ChatInput onChange={(val) => { setMessage(val) }} onSubmit={() => { setMessage(''); }} message={message} />
		</div>
	);
}