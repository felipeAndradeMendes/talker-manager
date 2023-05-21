const connection = require('./connection');

// const findAll = async () => {
//   const [result] = await connection.execute('SELECT * FROM talkers');
  
//   const newResult = result.map(({ age, id, name, talk_watched_at, talk_rate }) => {
//     return ({ age, id, name, talk: { watchedAt: talk_watched_at, rate: talk_rate } });
//   });
//   return newResult;
//   // return result;
// };

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM talkers');
  
  const newResult = result.map((talker) => ({ 
      age: talker.age, 
      id: talker.id,
      name: talker.name,
      talk: { 
        watchedAt: talker.talk_watched_at, 
        rate: talker.talk_rate, 
      },
    }));
  return newResult;
};

module.exports = findAll;
