import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FY_FAUNADB_SERVER_SECRET,
});

async function createUser(req, res) {
  const { uid, name, email } = req.body;
  const newUser = {
    data: {
      uid,
      name,
      email,
    },
  };
  try {
    const response = await client.query(
      q.Create(q.Collection('users'), newUser)
    );
    console.log('Response', response);
    res.status(200).json(response);
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).json(error);
  }
}

export default createUser;
