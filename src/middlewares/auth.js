const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' }); 
  }
  next();
};

module.exports = auth;

// usei typeof authorization !== "number" || na validação e deu certo o quesito 02 do req 5, porem os outros param de passar.