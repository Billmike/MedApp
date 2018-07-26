/**
 * Generate a random, unique userID
 */
const generateUserId = () => {
  const randomUserID = `_-${Math.random().toString(36).substr(2, 9)}`;
  return randomUserID.toUpperCase();
};

export default generateUserId;
