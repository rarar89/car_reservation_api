export const generateNumber = (len = 31) => {
  let result = '';
  for (let i = 0; i < len; i++) {
    result += Math.floor(Math.random() * 10); // Generate a random number between 0 and 9.
  }
  return result;
};
