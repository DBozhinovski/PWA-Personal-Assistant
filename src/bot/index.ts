import { initBot } from "./bootstrap"; 
import { skills } from './skills';

interface Bot {
  nlp: any;
  compromise: any;
}

let bot: Bot;
(async () => {
  bot = await initBot();
})()

let data: { [key: string]: any } = {};
const stored = localStorage.getItem('userData');

if (stored) {
  try {
    data = JSON.parse(stored);
  } catch (e) {
    console.error(e);
  }
}

export const greet = async () => {
  // if (data.name) {
  //   return `Hi ${data.name}! How can I help you today?`;
  // } else {
  //   return `Hello. I'm not sure we've met before. How should I call you?`;
  // }
  let res = {
    answer: '',
  };

  if (data.name) {
    res = await bot.nlp.process('en', '__system.hello.known__', data);
  } else {
    res = await bot.nlp.process('en', '__system.hello.unknown__');
  }

  return res.answer;
}

export const getReply = async (message: string) => {
  // return message;
  const res = await bot.nlp.process('en', message, data);
  const analysis = bot.compromise(message);
  console.log(res, analysis);
  const processed = skills.forEach(s => s(res, analysis));
  console.log(processed);
  return res.answer;
}