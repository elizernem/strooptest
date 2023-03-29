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

export { removeColors, removeColoredWord, removeBoolean };
