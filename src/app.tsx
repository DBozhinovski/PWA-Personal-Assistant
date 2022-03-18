import { useState, useReducer } from 'preact/hooks';

import ReloadPrompt from './ReloadPrompt';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';

import { getReply } from './bot';

const initialState = {
	messages: [],
}

// Message contents and owner, so we can differentiate those messages and style them accordingly 
interface Message {
	message: string
	owner: 'me'|'bot'
}

// Our message history
interface ReducerState {
	messages: Message[];
};

// Our (currently) only reducer action and its payload
interface ReducerAction {
	type: 'addMessage';
	payload: { message: Message }
};

// The reducer which will handle message changes
const reducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'addMessage': {
			return { messages: [...state.messages, action.payload.message] };
		}
		default: {
			console.error("I’m sorry, Dave. I’m afraid I can’t do that.");
			return state;
		}
	}
}

export function App() {
  const [message, setMessage] = useState<string>('');
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="chat-root">
      <ReloadPrompt />
			{/* Render message history */}
			<ChatHistory messages={state.messages} />

      <ChatInput onChange={(val) => { setMessage(val) }} onSubmit={() => { 
				dispatch({ type: 'addMessage', payload: { message: { message, owner: 'me'} } }); // Add message to state
				setTimeout(() => {
					const reply = getReply(message);
					dispatch({ type: 'addMessage', payload: { message: { message: reply, owner: 'bot'} } });
				}, 1000);
				setMessage(''); // Reset message, so we can input a new one
			}} message={message} />
		</div>
	);
}