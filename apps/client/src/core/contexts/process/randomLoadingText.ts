export const randomLoadingText = () => {
  const text = texts[Math.floor(Math.random() * texts.length)];
  return text;
};

const texts = [
  "Each card stunts performer is responsible for 5x4 pixels, so they'd better not mess up the teeth part.",
  "Jaturamitr card stunts only have 30 colors to construct pictures with.",
  "Despite being a football tournament, Jaturamitr is more known for its card stunts.",
  "Each school recruits 1,250 students to man the card stunts 'plates'.",
];
