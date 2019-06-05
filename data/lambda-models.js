const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3',
  },
  useNullAsDefault: true,
};

const db = knex(knexConfig);

const get = (id) => {
  if (id) {
    return db('zoos').where({ id }).first();
  }

  return db('zoos');
}

const post = (body) => {
  return db('zoos').insert(body, ['id', 'name']);
}

const put = (id, body) => {
  return db('zoos').where({ id }).update(body);
}

const remove = (id) => {
  return db('zoos').where({ id }).del();
}

module.exports = {
  get,
  post,
  put,
  remove,
};
