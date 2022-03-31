import devpun from 'devpun';

interface InputData {
  [key: string]: any;
};

interface Intent {
  documents: string[];
  answers: Array<string | ((data?: InputData) => string)>;
  description?: string;
};

interface TrainingData {
  [key: string]: Intent
}

export const data: TrainingData = {
  'greetings.known': {
    documents: [
      '__system.hello.known__'
    ],
    answers: [
      (data) => `Hi ${data?.name}! How can I help you?'`,
      (data) => `Good to see you again ${data?.name}! What can I do for you?'`,
    ]
  },
  'greetings.unknown': {
    documents: [
      '__system.hello.unknown__'
    ],
    answers: [
      'Hi! I don\'t think we\'ve met. What should I call you?',
      'Hi there, what\'s your name?'
    ]
  },
  'answers.name': {
    description: 'I can learn your name - type "My name is..."',
    documents: [
      'My name is #Name',
      'You can call me #Name',
      'They call me #Name',
      'Call me #Name'
    ],
    answers: [
      (data) => `Good to meet you ${data?.name}! Can I help you with something?'`,
      (data) => `Nice meeting you ${data?.name}! How can I help you?'`,
    ]
  },
  'None': {
    documents: [],
    answers: [
      'I don\'t think I understand that. Type `help` to see a list of everything I can help you with.'
    ]
  },
  'help': {
    documents: [
      'help',
      'what can you do',
    ],
    answers: [
      () => {
        const skillDescriptionKeys = Object.keys(data).filter((k) => (data[k]).description);

        return `Things I can do for you:
        ${skillDescriptionKeys.map(k => `- ${data[k].description}`).join('')}`
      }
    ]
  },
  'joke': {
    description: 'I can tell you a joke - type: "Tell me a joke"',
    documents: [
      'tell me a joke',
      'I want to hear something funny',
      'make me laugh',
      'do you know any jokes?'
    ],
    answers: [
      () => {
        return devpun.random();
      }
    ],
  },
  'reminder': {
    description: 'I can remind you to do stuff - type: "Remind me to..."',
    documents: [
      'set a reminder',
      'remind me to',
      'set an alert',
    ],
    answers: [
      'Reminder set.'
    ]
  }
}