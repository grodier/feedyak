import faunadb from 'faunadb';
import { auth } from '../../../firebase/firebase-server';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FY_FAUNADB_SERVER_SECRET,
});

async function getUser(req, res) {
  const authToken = req.headers.authorization.split(' ')[1];
  const userInfo = await auth.verifyIdToken(authToken);
  const uid = req.query.id;
  console.log('UID', uid);
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
