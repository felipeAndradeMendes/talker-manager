const express = require('express');
const readFile = require('../utils/readFile');
const writeFileFunction = require('../utils/writeFile');
const auth = require('../middlewares/auth');
const findAll = require('../db/talkerDb');
const {
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkRateInt,
  validateRate,
  validateRateInt,
} = require('../middlewares/validateTalker');
const {
  validateSearchTalkRate, validateSearchDate,
} = require('../middlewares/validateSearch');

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  const talkers = await readFile();
  res.status(200).json(talkers);
});

router.get('/db', async (req, res) => {
  try {
    const result = await findAll();
    // console.log('RESULT:', result);
    res.status(200).json(result);    
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get('/search', auth, 
  validateSearchDate,
  validateSearchTalkRate,
  async (req, res) => {
  try {
    const talkers = await readFile();
    let filteredTalkers = talkers;
    if (req.query.q) {
      filteredTalkers = talkers
        .filter((talker) => talker.name.toLowerCase().includes(req.query.q.toLowerCase()));
    }
    if (req.query.rate) {
      filteredTalkers = filteredTalkers.filter((item) => item.talk.rate === Number(req.query.rate));
    }
    if (req.query.date) {
      filteredTalkers = filteredTalkers.filter((item) => item.talk.watchedAt === req.query.date);
    }
    res.status(200).json(filteredTalkers);  
  } catch (error) {
    res.status(500).json(error.message);
  }
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

router.patch('/rate/:id', validateRate, validateRateInt, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    // console.log('RATE:', req.body.rate);

    const index = talkers.findIndex((talker) => talker.id === Number(id));
    talkers[index].talk.rate = req.body.rate;

    await writeFileFunction(talkers);    
    res.status(204).end();    
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;