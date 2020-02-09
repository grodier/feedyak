import { auth } from '../../src/firebase/firebase-server';

async function logoutSession(req, res) {
  const sessionCookie = req.cookies.session || req.body.session || '';
  try {
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    await auth.revokeRefreshTokens(decodedToken.uid);
    res.status(200).json({});
  } catch (error) {
    res.status(400).json(error);
  }
}

export default logoutSession;
