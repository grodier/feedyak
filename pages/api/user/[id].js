import faunadb from 'faunadb';
import { auth } from '../../../src/firebase/firebase-server';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FY_FAUNADB_SERVER_SECRET,
});

async function getUser(req, res) {
  console.log('REQ', req.body);
  console.log('COOKIE', req);
  const sessionCookie = req.cookies.session || req.body.session || '';
  console.log('SESSION OF GET', sessionCookie);
  const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
  const { uid } = decodedToken;
  try {
    const response = await client.query(
      q.Get(q.Match(q.Index('user_by_uid'), uid))
    );
    console.log('Response2', response);
    res.status(200).json(response);
  } catch (error) {
    console.log('ERROR2', error);
    res.status(400).json(error);
  }
}

export default getUser;
