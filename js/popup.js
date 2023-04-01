let startTimer;

const switchScreen = (popup, mainScreen) => {
  startTimer = new Date();
  popup.classList.remove("open");
  popup.classList.add("close");
  mainScreen.classList.remove("close");
  mainScreen.classList.add("open");
};

export { startTimer, switchScreen };
