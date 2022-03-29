import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { data } from './data';
import compromise from 'compromise';
import datePlugin from 'compromise-dates';

compromise.plugin(datePlugin);

type intentKey = keyof typeof data;

export const initBot = async () => {
  const container = await containerBootstrap();
  container.use(Nlp);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('en');

  Object.keys(data).forEach((intent) => {
    data[intent as intentKey].documents.forEach(doc => {
      nlp.addDocument('en', doc, intent);
    });

    data[intent as intentKey].answers.forEach(a => {
      nlp.addAnswer('en', intent, a);
    })
  });

  await nlp.train();
  
  return {
    nlp,
    compromise
  }
}