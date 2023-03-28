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

//Arrays with colors in english and in russian
const colorsKeys = Object.keys(PLAY_COLORS);
const colorsValues = Object.values(PLAY_COLORS);

// startButton.addEventListener("click", () => {
//   modal.classList.remove("open");
//   modal.classList.add("close");
//   gameBoard.classList.remove("close");
//   gameBoard.classList.add("open");
// });

const switchScreen = (popup, mainScreen) => {
  popup.classList.remove("open");
  popup.classList.add("close");
  mainScreen.classList.remove("close");
  mainScreen.classList.add("open");
};

startButton.addEventListener("click", () => {
  switchScreen(modal, gameBoard);
});

introCorrectButton.addEventListener("click", () => {
  instructionEstimate.classList.remove("dialog__note--falsy");
  instructionEstimate.classList.add("dialog__note--correct");
  instructionEstimate.textContent = "";
});

introDistractorButton.addEventListener("click", () => {
  instructionEstimate.classList.remove("dialog__note--correct");
  instructionEstimate.classList.add("dialog__note--falsy");
  instructionEstimate.textContent = "Смотри на цвет слова, не на его значение!";
});

modalCloseButton.addEventListener("click", () => {
  instructionEstimate.classList.remove("dialog__note--correct");
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

const giveButtonsColor = (buttons, colors) => {
  let unusedColors = colors.slice();
  unusedColors.splice(unusedColors.indexOf(wordColorValue), 1);
  unusedColors.splice(
    unusedColors.indexOf(
      getKeyByValue(PLAY_COLORS, `${colorWord.textContent}`)
    ),
    1
  );
  let correctButton = randomArrayElement(buttons);
  let falsyButton = randomArrayElement(buttons);
  while (correctButton == falsyButton) {
    falsyButton = randomArrayElement(buttons);
  }
  correctButton.classList.add(`correct`);
  falsyButton.classList.add(`falsy`);
  for (let i = 0; i < buttons.length; i++) {
    buttonColorValue = randomArrayElement(unusedColors);
    buttons[i].classList.add(`${buttonColorValue}`);
    unusedColors.splice(unusedColors.indexOf(buttonColorValue), 1);
  }
  colorsKeys.forEach((color) => {
    if (
      correctButton.classList.contains(color) ||
      falsyButton.classList.contains(color)
    ) {
      correctButton.classList.remove(color);
      falsyButton.classList.remove(color);
    }
  });
  correctButton.classList.add(`${wordColorValue}`);
  falsyButton.classList.add(
    `${getKeyByValue(PLAY_COLORS, `${colorWord.textContent}`)}`
  );
};

document.addEventListener("DOMContentLoaded", (ready) => {
  giveWordColor(colorWord);
  giveWordText(colorWord, colorsValues);
  giveButtonsColor(colorButton, colorsKeys);
});

let clicks = 0;
let correctAnswers = 0;
let errorAnswers = 0;
let falseOfText = 0;

function coloredButtonClick(event) {
  clicks++;
  if (event.target.classList.contains("correct")) {
    correctAnswers++;
  } else if (event.target.classList.contains("falsy")) {
    falseOfText++;
    errorAnswers++;
  } else {
    errorAnswers++;
  }
  removeColoredWord(colorWord, colorsKeys);
  removeColors(colorButton, colorsKeys);
  removeBoolean(colorButton);
  giveWordColor(colorWord);
  giveWordText(colorWord, colorsValues);
  giveButtonsColor(colorButton, colorsKeys);
}

colorButtonList.addEventListener("click", coloredButtonClick, true);

pauseButton.addEventListener("click", () => {
  clicksNumberValue.textContent = clicks;
  correctAnswersValue.textContent = correctAnswers;
  errorAnswersValue.textContent = errorAnswers;
  distractorErrorsValue.textContent = falseOfText;
});
