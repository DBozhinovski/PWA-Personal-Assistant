import { useState, useReducer, useEffect, StateUpdater } from 'preact/hooks';
import { Vocal } from '@untemps/vocal';

import ReloadPrompt from './ReloadPrompt';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';

import { getReply, greet } from './bot';

// Read messages from storage if any
const messagesFromStorage = JSON.parse(localStorage.getItem('messageHistory') || '[]');

const initialState = {
  // messages: [],
  messages: messagesFromStorage,
};

const vocal = new Vocal({
  lang: 'en-US',
  continuous: true,
});

vocal.addEventListener('speechstart', (event: any) => console.log('Vocal starts recording'));
vocal.addEventListener('speechend', (event: any) => console.log('Vocal stops recording'));
vocal.addEventListener('error', (error: any) => console.error(error));

const addSpeechListener = (setMessage: StateUpdater<string>, dispatch: (action: ReducerAction) => void) => {
  vocal.addEventListener('result', (event: any, result: string) => {
    setMessage(result);
    vocal.stop();
    dispatch({
      type: 'addMessage',
      payload: { message: { message: result, owner: 'me' } },
    }); // Add message to state
    setTimeout(async () => {
      const reply = await getReply(result, dispatch);
      dispatch({
        type: 'addMessage',
        payload: { message: { message: reply, owner: 'bot' } },
      });
    }, 1000);
    setMessage(''); // Reset message, so we can input a new one
  });
};

if (!Vocal.isSupported) {
  console.error('Vocal is not supported');
} else {
  console.log('Vocal supported');
}

// Message contents and owner, so we can differentiate those messages and style them accordingly
interface Message {
  message: string;
  owner: 'me' | 'bot';
}

// Our message history
interface ReducerState {
  messages: Message[];
}

// Our (currently) only reducer action and its payload
export interface ReducerAction {
  type: 'addMessage';
  payload: { message: Message };
}

// The reducer which will handle message changes
const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'addMessage': {
      localStorage.setItem('messageHistory', JSON.stringify([...state.messages, action.payload.message]));
      return { messages: [...state.messages, action.payload.message] };
    }
    default: {
      console.error("I'm sorry, Dave. I'm afraid I can't do that.");
      return state;
    }
  }
};

export function App() {
  const [message, setMessage] = useState<string>('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    addSpeechListener(setMessage, dispatch);

    (async () => {
      const reply = await greet();
      dispatch({
        type: 'addMessage',
        payload: { message: { message: reply, owner: 'bot' } },
      });
    })();
  }, []);

  return (
    <div className="chat-root">
      <ReloadPrompt />
      {/* Render message history */}
      <ChatHistory messages={state.messages} />

      <ChatInput
        onChange={(val) => {
          setMessage(val);
        }}
        onSubmit={() => {
          dispatch({
            type: 'addMessage',
            payload: { message: { message, owner: 'me' } },
          }); // Add message to state
          setTimeout(async () => {
            const reply = await getReply(message, dispatch);
            dispatch({
              type: 'addMessage',
              payload: { message: { message: reply, owner: 'bot' } },
            });
          }, 1000);
          setMessage(''); // Reset message, so we can input a new one
        }}
        onSpeech={() => {
          vocal.start();
        }}
        message={message}
      />
    </div>
  );
}
