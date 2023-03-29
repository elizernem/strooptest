import { switchScreen } from "./popup.js";
import { checkAnswer, resetValues } from "./instruction.js";
import {
  giveWordColor,
  giveWordText,
  setCorrectAndFalsyButtons,
  giveButtonsColor,
} from "./give-values.js";
import {
  colorsKeys,
  colorsValues,
  colorButton,
  colorWord,
  coloredButtonOnClick,
} from "./game.js";
import { showScore } from "./scores.js";

const startButton = document.querySelector(".start");
const instructionButtons = document.querySelector(".wrapper");
const modalCloseButton = document.querySelector(".dialog__close");
const colorButtonList = document.querySelector(".game__buttons-wrapper");
const pauseButton = document.querySelector(".game__pause");

const modal = document.querySelector(".modal");
const gameBoard = document.querySelector(".game");
const instructionButtonsElement = Array.from(
  instructionButtons.querySelectorAll(".dialog__button")
);
const instructionEstimate = document.querySelector(".dialog__note");

startButton.addEventListener("click", () => {
  switchScreen(modal, gameBoard);
});

instructionButtons.addEventListener("click", (event) => {
  checkAnswer(event.target, instructionEstimate);
});

modalCloseButton.addEventListener("click", () => {
  resetValues(instructionEstimate, instructionButtonsElement);
  modalInfo.close();
});

document.addEventListener("DOMContentLoaded", (ready) => {
  giveWordColor(colorWord);
  giveWordText(colorWord, colorsValues);
  setCorrectAndFalsyButtons(colorButton);
  giveButtonsColor(colorButton, colorsKeys);
});

colorButtonList.addEventListener("click", coloredButtonOnClick, true);

pauseButton.addEventListener("click", () => {
  showScore();
});
