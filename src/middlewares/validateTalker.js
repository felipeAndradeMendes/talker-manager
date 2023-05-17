const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next()
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });    
  }
  if (!Number.isInteger(age) || Number.isInteger(age) < 18) {
    return res.status(400).json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });        
  }

  next();
};

const validateDataFormat = (date) => {
  var regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;  
  return regex.test(date);
};

const validateTalk = (res, req, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validateDataFormat(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa' });
  }
  if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (parseInt(talk.rate) < 1 || parseInt(talk.rate > 5)) {
    return res.status(400).json({ message: ' campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
};