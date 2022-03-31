import { ReducerAction } from "../app";
import { initBot } from "./bootstrap"; 
import { skills } from './skills';

interface Bot {
  nlp: any;
  compromise: any;
}

let bot: Bot;
let data: { [key: string]: any } = {};

(async () => {
  bot = await initBot();
  
  const stored = localStorage.getItem('userData');
  
  if (stored) {
    try {
      data = JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
})()

export const greet = async () => {
  let res = null;

  if (data.name) {
    res = await bot.nlp.process('en', '__system.hello.known__');
  } else {
    res = await bot.nlp.process('en', '__system.hello.unknown__');
  }

  // Response can either be a plain string or a template literal
  if (typeof res.answer === 'function') {
    return res.answer(data);
  }

  return res.answer;
}

export const getReply = async (message: string, dispatch: (action: ReducerAction) => void) => {
  const res = await bot.nlp.process('en', message);
  const analysis = bot.compromise(message);

  // Run each skill over input
  skills.forEach(s => s(res, analysis, data, dispatch));

  // Store data for next boot
  localStorage.setItem('userData', JSON.stringify(data));

  // Response can either be a plain string or a template literal
  if (typeof res.answer === 'function') {
    return res.answer(data);
  }

  return res.answer;
}