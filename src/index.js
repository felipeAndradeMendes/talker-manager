const express = require('express');
const readFile = require('./utils/readFile');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// GET
app.get('/talker', async (req, res) => {
  const talkers = await readFile();
  res.status(200).json(talkers);
});

// GET BY ID
app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const talkerFound = talkers.find((talker) => talker.id === Number(id));

    if (talkerFound) {
      res.status(200).json(talkerFound);    
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// POST
app.post('/login', (req, res) => {
  // const { email, password } = req.body;
  const token = generateToken();
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
