import jwt from 'jsonwebtoken';

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
