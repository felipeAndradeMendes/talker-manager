const fs = require('fs').promises;
const path = require('path');

const writeFileFunction = async (talkersUpdated) => {
  try {
    const talkersUpdatedStringified = JSON.stringify(talkersUpdated);
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), talkersUpdatedStringified);
  } catch (error) {
    console.error(`Erro ao escrever o arquivo do writeFunc: ${error.message}`);
  }
};

module.exports = writeFileFunction;