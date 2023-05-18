const fs = require('fs').promises;
const path = require('path');
const readFile = require('./readFile');

const writeFileFunction = async (newTalker) => {
  // const { name, age, talk } = newTalker;
  try {
    const talkers = await readFile();

    const talkersUpdated = [...talkers, {
    ...newTalker,
    }];

    const talkersUpdatedStringified = JSON.stringify(talkersUpdated);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), talkersUpdatedStringified);
  } catch (error) {
    console.error(`Erro ao escrever o arquivo do writeFunc: ${error.message}`);
  }
};

// const ex = {
//   "name": "Danielle Santos",
//   "age": 56,
//   "talk": {
//     "watchedAt": "22/10/2019",
//     "rate": 5
//   }
// }

// console.log('TESTE QRITE FILE', writeFile(ex))
module.exports = writeFileFunction;