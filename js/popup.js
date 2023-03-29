const switchScreen = (popup, mainScreen) => {
  popup.classList.remove("open");
  popup.classList.add("close");
  mainScreen.classList.remove("close");
  mainScreen.classList.add("open");
};

export { switchScreen };
