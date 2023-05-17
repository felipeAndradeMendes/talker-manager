const fs = require('fs').promises;
const readFile  = require('./readFile');

const path = require('path');

const writeFileFunction = async (newTalker) => {
  try {
    const talkers = await readFile();
    console.log(talkers);
    const talkersUpdated = JSON.stringify([...talkers, {
      id: talkers[talkers.length -1].id + 1, ...newTalker
    }]);
    const talkersUpdatedStringified = JSON.stringify(talkersUpdated);
    // console.log('TALKERS STRINGIFIED', talkersUpdated)
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), talkersUpdatedStringified);
    // console.log('Arquivo escrito com sucesso!');
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