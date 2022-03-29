import Three from "compromise/types/view/three";

const extractName = (nlp: any, analysis: Three, data: { [key: string]: any }) => {
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

export const skills = [extractName];



