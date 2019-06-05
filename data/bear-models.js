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
    return db('bears').where({ id }).first();
  }

  return db('bears');
}

const post = (body) => {
  return db('bears').insert(body, ['id', 'name']);
}

const put = (id, body) => {
  return db('bears').where({ id }).update(body);
}

const remove = (id) => {
  return db('bears').where({ id }).del();
}

module.exports = {
  get,
  post,
  put,
  remove,
};
