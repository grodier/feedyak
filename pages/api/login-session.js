import { auth } from '../../src/firebase/firebase-server';

async function loginSession(req, res) {
  const authToken = req.headers.authorization.split(' ')[1];
  const sessionToken = await auth.createSessionCookie(authToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  });
  res.status(200).json({ sessionToken });
}

export default loginSession;
