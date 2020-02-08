import faunadb from 'faunadb';
import { auth } from '../../src/firebase/firebase-server';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FY_FAUNADB_SERVER_SECRET,
});

async function getMe(req, res) {
  const sessionCookie = req.cookies.session || req.body.session || '';
  try {
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const { uid } = decodedToken;
    try {
      const response = await client.query(
        q.Get(q.Match(q.Index('user_by_uid'), uid))
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(401).json(error);
  }
}

export default getMe;
