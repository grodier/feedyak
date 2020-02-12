async function getFeedback(req, res) {
  const feedback = {
    feedback: ['item 1', 'item2', "here's some more feedback"],
  };
  res.status(200).json(feedback);
}

export default getFeedback;
