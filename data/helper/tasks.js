const db = require('../../dbConfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db('tasks');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((task) => {
        if (task) {
          return mappers.tasksToBody(task);
        } else {
          return null;
        }
      });
  } else {
    return query.then((tasks) => {
      return tasks.map((task) => mappers.tasksToBody(task));
    });
  }
}

function insert(task) {
  return db('tasks')
    .insert(task, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('tasks')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('tasks').where('id', id).del();
}
