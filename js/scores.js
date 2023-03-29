const clicksNumberValue = document.querySelector(".clicks");
const correctAnswersValue = document.querySelector(".correct-answers");
const errorAnswersValue = document.querySelector(".error-answers");
const distractorErrorsValue = document.querySelector(".distractor-errors");

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

const showScore = () => {
  clicksNumberValue.textContent = clicks;
  correctAnswersValue.textContent = correctAnswers;
  errorAnswersValue.textContent = errorAnswers;
  distractorErrorsValue.textContent = falseOfText;
};

export { getScore, showScore };
