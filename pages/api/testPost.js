function testPost(req, res) {
  console.log(req.body);
  res.status(200).json({ name: req.body });
}

export default testPost;
