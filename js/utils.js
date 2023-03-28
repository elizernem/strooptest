const randomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
