import { auth } from '../../../firebase/firebase-server';

async function getUser(req, res) {
  const authToken = req.headers.authorization.split(' ')[1];
  console.log('authtoken', authToken);
  const userInfo = await auth.verifyIdToken(authToken);
  console.log('UID', userInfo);
  const uid = req.query.id;
  const user = {
    id: uid,
    name: 'George',
    email: 'grodier@test.com',
  };
  res.status(200).json(user);
}

export default getUser;
