import { switchScreen } from "./popup.js";
import { start } from "./start-timer.js";
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
import { removeScore, showScore } from "./scores.js";
import { giveVisibility, removeVisibility } from "./hiding.js";
// import { resetSettings } from "./settings.js";
// import { validateTime, validateCount } from "./form.js";

const startButton = document.querySelector(".start");
const instructionButtons = document.querySelector(".wrapper");
const modalCloseButton = document.querySelector(".dialog__close");
const colorButtonList = document.querySelector(".game__buttons-wrapper");
const pauseButton = document.querySelector(".game__pause");
const restartButton = document.querySelector(".button--back");
const statisticCloseButton = document.querySelector(".statistics__close");
const settingsButton = document.querySelector(".button--settings");
const settingsCloseButton = document.querySelector(".settings__close");
const settingsClickButton = document.querySelector(".clicks__yes");
const settingsTimerButton = document.querySelector(".timer__yes");
const settingsNoClickButton = document.querySelector(".clicks__no");
const settingsNoTimerButton = document.querySelector(".timer__no");

const modal = document.querySelector(".modal");
const gameBoard = document.querySelector(".game");
const instructionButtonsElement = Array.from(
  instructionButtons.querySelectorAll(".dialog__button")
);
const instructionEstimate = document.querySelector(".dialog__note");
const statistics = document.querySelector(".statistics");
const settings = document.querySelector(".settings");
const settingsClickRange = document.querySelector(".settings__range--clicks");
const settingsTimerRange = document.querySelector(".settings__range--timer");

const settingsSaveButton = document.querySelector(".settings__submit");

startButton.addEventListener("click", () => {
  switchScreen(modal, gameBoard);
  start();
});

settingsButton.addEventListener("click", () => {
  switchScreen(modal, settings);
});

settingsClickButton.addEventListener("click", () => {
  giveVisibility(settingsClickRange);
  // isFilledIn(settingsClickRange, settingsSaveButton);
  // validateCount(settingsClickRange, settingsSaveButton);
});

settingsNoClickButton.addEventListener("click", () => {
  removeVisibility(settingsClickRange);
});

settingsTimerButton.addEventListener("click", () => {
  giveVisibility(settingsTimerRange);
  // validateTime(settingsTimerRange, settingsSaveButton);
  // isFilledIn(settingsTimerRange, settingsSaveButton);
});

settingsNoTimerButton.addEventListener("click", () => {
  removeVisibility(settingsTimerRange);
});

settingsCloseButton.addEventListener("click", () => {
  switchScreen(settings, modal);
  removeVisibility(settingsClickRange);
  removeVisibility(settingsTimerRange);
  // resetSettings();
});

settingsSaveButton.addEventListener("click", () => {
  switchScreen(settings, modal);
  console.log(111);
});

restartButton.addEventListener("click", () => {
  removeScore();
  switchScreen(gameBoard, modal);
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
  switchScreen(gameBoard, statistics);
  showScore();
  document.body.classList.add("scroll-lock");
});

statisticCloseButton.addEventListener("click", () => {
  switchScreen(statistics, gameBoard);
});

// const timeValue = document.querySelector(".settings__range--timer");
// const clickValue = document.querySelector(".settings__range--clicks");
// const gameButtons = document.querySelector(".game__buttons-wrapper");
// const saveSettingsButton = document.querySelector(".settings__submit");

// saveSettingsButton.addEventListener("click", () => {
// console.log(timeValue.value);
// console.log(clickValue.value);
// });

