import jwt from 'jsonwebtoken';

const generateToken = (id, firstName, lastName, email) => {
  const token = jwt.sign({
    id,
    firstName,
    lastName,
    email
  }, 'secretkeyhere', { expiresIn: '30 days' });
  return token;
};

export default generateToken;
