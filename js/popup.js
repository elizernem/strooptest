// let startTimer;

const switchScreen = (toClose, toOpen) => {
  // startTimer = new Date();
  toClose.classList.remove("open");
  toClose.classList.add("close");
  toOpen.classList.remove("close");
  toOpen.classList.add("open");
};

export { switchScreen };
