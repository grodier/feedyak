import { auth } from '../../src/firebase/firebase-server';

async function loginSession(req, res) {
  console.log('LOGIN SESSION');
  const authToken = req.headers.authorization.split(' ')[1];
  console.log(authToken);
  const sessionToken = await auth.createSessionCookie(authToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  });
  console.log(sessionToken);
  res.status(200).json({ sessionToken });
}

export default loginSession;
