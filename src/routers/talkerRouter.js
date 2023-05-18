const express = require('express');
const readFile = require('../utils/readFile');
const writeFileFunction = require('../utils/writeFile');
const auth = require('../middlewares/auth');
const {
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkRateInt,
} = require('../middlewares/validateTalker');

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  const talkers = await readFile();
  res.status(200).json(talkers);
});

// GET BY ID
router.get('/:id', async (req, res) => {
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

router.use(auth);

router.post('/', 
  validateName, 
  validateAge, 
  validateTalk, 
  validateTalkRate, 
  validateTalkRateInt, async (req, res) => {  
  try {
    const talkers = await readFile();
    
    const newTalker = req.body;
    const newTalkerWithId = { id: talkers[talkers.length - 1].id + 1, ...newTalker };
    const talkersUpdated = [...talkers, {
    ...newTalkerWithId,
    }];
    await writeFileFunction(talkersUpdated);
    res.status(201).json(newTalkerWithId);
  } catch (error) {
    res.status(500).json({ message: error.message });    
  }
});

router.put('/:id', 
validateName, 
  validateAge, 
  validateTalk, 
  validateTalkRate, 
  validateTalkRateInt, async (req, res) => {
  try {
    const talkers = await readFile();
    const { id } = req.params;
    const index = talkers.findIndex((talker) => talker.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const updatedTalker = { id: Number(id), ...req.body };

    talkers[index] = updatedTalker;
    await writeFileFunction(talkers);
    res.status(200).json(updatedTalker);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const updatedTalkers = talkers.filter((talker) => talker.id !== Number(id));
    await writeFileFunction(updatedTalkers);
    
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;