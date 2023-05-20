const ERROR_MSG_NUMBER_1_5 = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });    
  }
  if (typeof age !== 'number') {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  if (!Number.isInteger(age)) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });        
  }
  if (age < 18) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }

  next();
};

const validateDataFormat = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  return regex.test(date);
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validateDataFormat(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  if (parseInt(talk.rate, 10) < 1) {
    return res.status(400)
      .json({ message: ERROR_MSG_NUMBER_1_5 });
  }
  if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (talk.rate === 0) {
    return res.status(400)
      .json({ message: ERROR_MSG_NUMBER_1_5 });
  }
  if (parseInt(talk.rate, 10) > 5) {
    return res.status(400)
      .json({ message: ERROR_MSG_NUMBER_1_5 });
  }
  
  next();
};

const validateTalkRateInt = (req, res, next) => {
  const { talk } = req.body;

  if (!Number.isInteger(talk.rate)) {
    return res.status(400)
      .json({ message: ERROR_MSG_NUMBER_1_5 });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body;
  console.log('RATE:', req.body);

  if (!rate && rate !== 0) { 
    return res.status(400)
    .json({ message: 'O campo "rate" é obrigatório' });
  }

  const numRate = Number(rate);
  if (numRate < 1 || numRate > 5) {
    return res.status(400)
    .json({ message: ERROR_MSG_NUMBER_1_5 });
  }
  next();
};

const validateRateInt = (req, res, next) => {
  const { rate } = req.body;

  if (!Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: ERROR_MSG_NUMBER_1_5 });
  }
  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkRateInt,
  validateRate,
  validateRateInt,
};