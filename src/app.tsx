import { useState, useReducer } from 'preact/hooks';

import ReloadPrompt from './ReloadPrompt';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';

import { getReply } from './bot';

const initialState = {
	messages: [],
}

interface Message {
	message: string
	owner: 'me'|'bot'
}

interface ReducerState {
	messages: Message[];
};

interface ReducerAction {
	type: 'addMessage';
	payload: { message: Message }
};

const reducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'addMessage': return { messages: [...state.messages, action.payload.message] }
	}
}

export function App() {
  const [message, setMessage] = useState<string>('');
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="chat-root">
      <ReloadPrompt />
			<ChatHistory messages={state.messages} />
      <ChatInput onChange={(val) => { setMessage(val) }} onSubmit={() => { 
				dispatch({ type: 'addMessage', payload: { message: { message, owner: 'me'} } });
				setTimeout(() => {
					const reply = getReply(message);
					dispatch({ type: 'addMessage', payload: { message: { message: reply, owner: 'bot'} } });
				}, 1000);
				setMessage('');
			}} message={message} />
		</div>
	);
}