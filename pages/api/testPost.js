function testPost(req, res) {
  res.status(200).json({ name: req.body });
}

export default testPost;
