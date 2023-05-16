import { startTimer } from "./start-timer.js";
const timerValue = document.querySelector(".time");
const clicksNumberValue = document.querySelector(".clicks-count");
const correctAnswersValue = document.querySelector(".correct-answers");
const errorAnswersValue = document.querySelector(".error-answers");
const distractorErrorsValue = document.querySelector(".distractor-errors");

let endTimer;
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

function humanReadable(milliseconds) {
  function giveZero(time) {
    return time < 10 ? `0${time}` : time;
  }
  const seconds = Math.round(milliseconds / 1000);
  let updMilliseconds = milliseconds - seconds * 1000;
  updMilliseconds < 0
    ? (updMilliseconds = 0)
    : (updMilliseconds = updMilliseconds);
  const secondsInHour = 60 * 60;
  const secondsInMinute = 60;
  let hours = Math.floor(seconds / secondsInHour);
  let minutes = Math.floor((seconds - hours * secondsInHour) / secondsInMinute);
  let calcSeconds = seconds - hours * secondsInHour - minutes * secondsInMinute;
  let updSeconds = calcSeconds < 0 ? 0 : calcSeconds;
  hours = giveZero(hours);
  minutes = giveZero(minutes);
  updSeconds = giveZero(updSeconds);
  let time = `${hours}:${minutes}:${updSeconds}:${updMilliseconds}`;
  timerValue.textContent = time;
}

const giveTime = (start, end) => {
  let milliseconds = end - start;
  humanReadable(milliseconds);
};

const showScore = () => {
  endTimer = new Date();
  giveTime(startTimer, endTimer);
  clicksNumberValue.textContent = clicks;
  correctAnswersValue.textContent = correctAnswers;
  errorAnswersValue.textContent = errorAnswers;
  distractorErrorsValue.textContent = falseOfText;
};

const removeScore = () => {
  clicks = 0;
  correctAnswers = 0;
  errorAnswers = 0;
  falseOfText = 0;
};

export { getScore, showScore, removeScore, clicks };
