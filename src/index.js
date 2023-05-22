const express = require('express');
const loginRouter = require('./routers/loginRouter');
const talkerRouter = require('./routers/talkerRouter');
// require('dotenv').config();

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);

app.listen(PORT, async () => {
  console.log('Online');
  // const [result] = await connection.execute('SELECT 1');
  // if (result) {
  //   console.log('MySQL connection OK');
  // }
});
