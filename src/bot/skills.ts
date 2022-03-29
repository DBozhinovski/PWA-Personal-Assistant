import Three from "compromise/types/view/three";

const extractName = (nlp: any, analysis: Three) => {
  if (nlp.intent === 'answers.name') {
    const name = analysis.people().text();
  }
};

export const skills = [extractName];



