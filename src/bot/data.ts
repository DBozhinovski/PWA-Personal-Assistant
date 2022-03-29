interface Data {
  [key: string]: any
}

export const data = {
  'greetings.known': {
    documents: [
      '__system.hello.known__'
    ],
    answers: [
      (data: Data) => `Hi ${data.name}! How can I help you?'`,
      (data: Data) => `Good to see you again ${data.name}! What can I do for you?'`,
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
  'answers.name' :{
    documents: [
      'My name is #Name',
      'You can call me #Name',
      'They call me #Name',
      'Call me #Name'
    ],
    answers: [
      (data: Data) => `Good to meet you ${data.name}! Can I help you with something?'`,
      (data: Data) => `Nice meeting you ${data.name}! How can I help you?'`,
    ]
  }
}