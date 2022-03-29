export const data = {
  'greetings.known': {
    documents: [
      '__system.hello.known__'
    ],
    answers: [
      'Hi {{ name }}! How can I help you?',
      'Good to see you again {{ name }}. What can I do for you?'
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
      'Good to meet you {{ name }}!',
      'Nice meeting you {{ name }}!',
    ]
  }
}