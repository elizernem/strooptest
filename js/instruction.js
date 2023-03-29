const classNames = {
  hidden: "visually-hidden",
  correctButton: "play-button--correct",
  distractorButton: "play-button--falsy",
  correctNote: "dialog__note dialog__note--correct",
  errorNote: "dialog__note dialog__note--falsy",
};

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

const resetValues = (note, buttons) => {
  note.className = "dialog__note";
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains(`${classNames.hidden}`)) {
      buttons[i].classList.remove(`${classNames.hidden}`);
    }
  }
};

export { checkAnswer, resetValues };
