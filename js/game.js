import { getScore } from "./scores.js";
import {
  giveWordColor,
  giveWordText,
  setCorrectAndFalsyButtons,
  giveButtonsColor,
} from "./give-values.js";
import {
  removeColors,
  removeColoredWord,
  removeBoolean,
} from "./remove-values.js";
// import { equal } from "./settings.js";

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
const colorsValues = Object.values(PLAY_COLORS);
const colorButton = Array.from(document.querySelectorAll(".game__button"));
const colorWord = document.querySelector(".color-word");

const coloredButtonOnClick = (event) => {
  getScore(event.target);
  removeColoredWord(colorWord, colorsKeys);
  removeColors(colorButton, colorsKeys);
  removeBoolean(colorButton);
  giveWordColor(colorWord);
  giveWordText(colorWord, colorsValues);
  setCorrectAndFalsyButtons(colorButton);
  giveButtonsColor(colorButton, colorsKeys);
  // equal();
};

export {
  PLAY_COLORS,
  colorsKeys,
  colorsValues,
  colorButton,
  colorWord,
  coloredButtonOnClick,
};
