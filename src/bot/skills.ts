import Three from 'compromise/types/view/three';
import setDateout from 'set-dateout';
import { ReducerAction } from '../app';

const extractName = (nlp: any, analysis: Three, data: { [key: string]: any }, dispatch: (action: ReducerAction) => void) => {
  if (nlp.intent === 'answers.name') {
    const name = analysis.people().text();

    if (name) {
      data.name = name;
    } else {
      // last ditch effort to extract the name
      const raw = analysis.json()[0].terms;
      const assumedName = raw[raw.length - 1];
      data.name = assumedName.text;
    }
  }
};

const setReminder = (nlp: any, analysis: any, data: { [key: string]: any }, dispatch: (action: ReducerAction) => void) => {
  if (nlp.intent === 'reminder') {
    const target = analysis.dates().json();
    console.log(target[0].dates.start);
    if (target[0].dates.start) {
      setDateout(() => {
        dispatch({ type: 'addMessage', payload: { message: { message: `⏰ Reminder: ${analysis.text()}`, owner: 'bot'} } });
      }, new Date(target[0].dates.start));
    }
  }
}

export const skills = [extractName, setReminder];



