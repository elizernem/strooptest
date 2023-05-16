const giveVisibility = (elem) => {
  elem.style.display = "block";
  elem.required = true;
};

const removeVisibility = (elem) => {
  elem.style.display = "none";
  elem.required = false;
};

export { giveVisibility, removeVisibility };
