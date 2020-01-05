async function createUser(req, res) {
  const { uid, name, email } = req.body;
  res.status(200).json({ name, uid, email });
}

export default createUser;
