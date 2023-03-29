import { randomArrayElement, getKeyByValue } from "./utils.js";
const PLAY_COLORS = {
  red: "красный",
  green: "зелёный",
  yellow: "жёлтый",
  pink: "розовый",
  blue: "голубой",
  orange: "оранжевый",
  violet: "фиолетовый",
  beige: "бежевый",
  brown: "коричневый",
};
const colorsKeys = Object.keys(PLAY_COLORS);
const colorWord = document.querySelector(".color-word");

let wordColorValue;
let buttonColorValue;
let wordTextValue;

const giveWordColor = (word) => {
  wordColorValue = randomArrayElement(colorsKeys);
  word.classList.add(`${wordColorValue}-word`);
};

const giveWordText = (word, colors) => {
  let unusedColors = colors.slice();
  unusedColors.splice(
    unusedColors.indexOf(PLAY_COLORS[`${wordColorValue}`]),
    1
  );
  wordTextValue = randomArrayElement(unusedColors);
  word.textContent = wordTextValue;
};

const setCorrectAndFalsyButtons = (buttons) => {
  let correctButton = randomArrayElement(buttons);
  let falsyButton = randomArrayElement(buttons);
  while (correctButton == falsyButton) {
    falsyButton = randomArrayElement(buttons);
  }
  correctButton.classList.add(`correct`);
  falsyButton.classList.add(`falsy`);
  correctButton.classList.add(`${wordColorValue}`);
  falsyButton.classList.add(
    `${getKeyByValue(PLAY_COLORS, `${colorWord.textContent}`)}`
  );
};

const giveButtonsColor = (buttons, colors) => {
  let unusedColors = colors.slice();
  unusedColors.splice(unusedColors.indexOf(wordColorValue), 1);
  unusedColors.splice(
    unusedColors.indexOf(
      getKeyByValue(PLAY_COLORS, `${colorWord.textContent}`)
    ),
    1
  );

  for (let i = 0; i < buttons.length; i++) {
    buttonColorValue = randomArrayElement(unusedColors);
    if (buttons[i].className === "game__button play-button") {
      buttons[i].classList.add(`${buttonColorValue}`);
      unusedColors.splice(unusedColors.indexOf(buttonColorValue), 1);
    }
  }
};

export {
  giveWordColor,
  giveWordText,
  setCorrectAndFalsyButtons,
  giveButtonsColor,
};
