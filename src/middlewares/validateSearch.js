const validateSearchTalkRate = (req, res, next) => {
  const { rate } = req.query;

    if (!rate) {
      return next();
    }
    const numRate = Number(rate);
    if (numRate < 1 || numRate > 5 || !Number.isInteger(numRate)) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
  next();
};

module.exports = {
  validateSearchTalkRate,
};