import jwt from 'jsonwebtoken';

/**
 * This method handler is responsible for generating a token.
 *
 * @param id The user_id from the database
 * @param firstName User's first name
 * @param lastName User's last name
 * @param email User's email
 * 
 * @returns {string} The token
 */
const generateToken = (id: any, firstName: string, lastName: string, email: string) => {
  const token = jwt.sign({
    id,
    firstName,
    lastName,
    email
  }, process.env.secretkey, { expiresIn: '30 days' });
  return token;
};

export default generateToken;
