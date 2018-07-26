/**
 * Generate a random, unique userID
 * 
 * @returns {string} The random ID to uppercase
 */
const generateUserId = () => {
  const randomUserID = `_-${Math.random().toString(36).substr(2, 9)}`;
  return randomUserID.toUpperCase();
};

export default generateUserId;
