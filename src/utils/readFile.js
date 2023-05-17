const fs = require('fs').promises;
const path = require('path');

async function readFile() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    
    console.log(talkers);
    return talkers;
  } catch (error) {
    console.log(`Erro ao ler o arquivo: ${error.message}`);
  }
}
readFile()
module.exports = readFile;