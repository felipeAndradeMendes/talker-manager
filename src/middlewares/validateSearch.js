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

const validateDataFormat = (date) => {
  // const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;

  return regex.test(date);
};

const validateSearchDate = (req, res, next) => {
  const { date } = req.query;

  if (!date) {
    return next();
  }

  if (validateDataFormat(date) === false) {
    return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  
  return next();  
};

module.exports = {
  validateSearchTalkRate,
  validateSearchDate,
};