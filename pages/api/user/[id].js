import { auth } from '../../../firebase/firebase-server';

async function getUser(req, res) {
  const authToken = req.headers.authorization.split(' ')[1];
  const userInfo = await auth.verifyIdToken(authToken);
  const uid = req.query.id;
  const user = {
    id: uid,
    name: 'George',
    email: 'grodier@test.com',
  };
  res.status(200).json(user);
}

export default getUser;
