"use strict";

const colorButton = Array.from(document.querySelectorAll(".game__button"));
const colorButtonList = document.querySelector(".game__buttons-wrapper");
const colorWord = document.querySelector(".color-word");
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
const startButton = document.querySelector(".start");
const modal = document.querySelector(".modal");
const gameBoard = document.querySelector(".game");
const pauseButton = document.querySelector(".game__pause");
const playTimeValue = document.querySelector(".time");
const clicksNumberValue = document.querySelector(".clicks");
const correctAnswersValue = document.querySelector(".correct-answers");
const errorAnswersValue = document.querySelector(".error-answers");
const distractorErrorsValue = document.querySelector(".distractor-errors");
const introCorrectButton = document.querySelector(".play-button--correct");
const introDistractorButton = document.querySelector(".play-button--falsy");
const instructionModal = document.querySelector(".modal__info");
const instructionEstimate = document.querySelector(".dialog__note");
const modalCloseButton = document.querySelector(".dialog__close");
const settingsCloseButton = document.querySelector(".settings__close");

const instructionButtons = document.querySelector(".wrapper");
const instructionButtonsElement = Array.from(
  instructionButtons.querySelectorAll(".dialog__button")
);

const restartButton = document.querySelectorAll(".button--back");

const classNames = {
  hidden: "visually-hidden",
  correctButton: "play-button--correct",
  distractorButton: "play-button--falsy",
  correctNote: "dialog__note dialog__note--correct",
  errorNote: "dialog__note dialog__note--falsy",
};

//Arrays with colors in english and in russian
const colorsKeys = Object.keys(PLAY_COLORS);
const colorsValues = Object.values(PLAY_COLORS);

// const switchScreen = (toClose, toOpen) => {
//   toClose.classList.remove("open");
//   toClose.classList.add("close");
//   toOpen.classList.remove("close");
//   toOpen.classList.add("open");
// };

let startTimer;

// const startTimer = () => {
//   timer1 = new Date().getMilliseconds();
//   console.log(timer1);
// };

startButton.addEventListener("click", () => {
  switchScreen(modal, gameBoard);
  console.log(new Date());
  startTimer = new Date();
});

const checkAnswer = (target, result) => {
  if (target.classList.contains(`${classNames.correctButton}`)) {
    result.className = `${classNames.correctNote}`;
    result.textContent = "";
  } else if (target.classList.contains(`${classNames.distractorButton}`)) {
    result.className = `${classNames.errorNote}`;
    result.textContent = "Смотри на цвет слова, не на его значение!";
  } else {
    result.className = `${classNames.errorNote}`;
    result.textContent = "Попробуй ещё!";
    target.classList.add(`${classNames.hidden}`);
  }
};

instructionButtons.addEventListener("click", (event) => {
  checkAnswer(event.target, instructionEstimate);
});

const resetValues = (note, buttons) => {
  note.className = "dialog__note";
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains(`${classNames.hidden}`)) {
      buttons[i].classList.remove(`${classNames.hidden}`);
    }
  }
};

modalCloseButton.addEventListener("click", () => {
  resetValues(instructionEstimate, instructionButtonsElement);
  modalInfo.close();
});

//Utils

const randomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

let wordColorValue;
let buttonColorValue;
let wordTextValue;

//Removing values

const removeColors = (buttons, colors) => {
  for (let i = 0; i < buttons.length; i++) {
    colors.forEach((color) => {
      if (buttons[i].classList.contains(color)) {
        buttons[i].classList.remove(color);
      }
    });
  }
};

const removeColoredWord = (word, colors) => {
  colors.forEach((color) => {
    if (word.classList.contains(`${color}-word`)) {
      word.classList.remove(`${color}-word`);
    }
  });
};

const removeBoolean = (buttons) => {
  for (let i = 0; i < buttons.length; i++) {
    if (
      buttons[i].classList.contains("correct") ||
      buttons[i].classList.contains("falsy")
    ) {
      buttons[i].classList.remove("correct");
      buttons[i].classList.remove("falsy");
    }
  }
};

//Giving values

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

document.addEventListener("DOMContentLoaded", (ready) => {
  giveWordColor(colorWord);
  giveWordText(colorWord, colorsValues);
  setCorrectAndFalsyButtons(colorButton);
  giveButtonsColor(colorButton, colorsKeys);
});

let clicks = 0;
let correctAnswers = 0;
let errorAnswers = 0;
let falseOfText = 0;

const getScore = (target) => {
  clicks++;
  if (target.classList.contains("correct")) {
    correctAnswers++;
  } else if (target.classList.contains("falsy")) {
    falseOfText++;
    errorAnswers++;
  } else {
    errorAnswers++;
  }
};

const coloredButtonOnClick = (event) => {
  getScore(event.target);
  removeColoredWord(colorWord, colorsKeys);
  removeColors(colorButton, colorsKeys);
  removeBoolean(colorButton);
  giveWordColor(colorWord);
  giveWordText(colorWord, colorsValues);
  setCorrectAndFalsyButtons(colorButton);
  giveButtonsColor(colorButton, colorsKeys);
};

colorButtonList.addEventListener("click", coloredButtonOnClick, true);

let endTimer;

pauseButton.addEventListener("click", () => {
  clicksNumberValue.textContent = clicks;
  correctAnswersValue.textContent = correctAnswers;
  errorAnswersValue.textContent = errorAnswers;
  distractorErrorsValue.textContent = falseOfText;
  // const dateFinish = new Data();
  // timer2 = dateFinish;
  // console.log(timer1 - timer2);
  endTimer = new Date();
  let diff = Math.abs((endTimer - startTimer) / 1000);
  let diffRound = Math.round(Math.abs((endTimer - startTimer) / 1000));
  console.log(endTimer);
  console.log((endTimer - Math.floor(startTimer)) / 1000);
  console.log(diffRound);
  console.log(diff);
});

// const dateStart = new Data();
// const dateFinish = new Data();
