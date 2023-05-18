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
// POST TALKER
// Ver se authenticação está sendo feita corretamente
router.post('/', 
  validateName, 
  validateAge, 
  validateTalk, 
  validateTalkRate, 
  validateTalkRateInt, async (req, res) => {  
  try {
    const talkers = await readFile();
    console.log(talkers);

    const newTalker = req.body;
    const newTalkerWithId = { id: talkers[talkers.length - 1].id + 1, ...newTalker };
    await writeFileFunction(newTalkerWithId);
    res.status(201).json(newTalkerWithId);
  } catch (error) {
    res.status(500).json({ message: error.message });    
  }
});

module.exports = router;