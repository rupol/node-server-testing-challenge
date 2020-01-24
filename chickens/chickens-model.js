const db = require("../data/config");

function get() {
  return db("chickens");
}

function getById(id) {
  return db("chickens")
    .where({ id })
    .first();
}

async function create(chicken) {
  const [id] = await db("chickens").insert(chicken);

  return db("chickens")
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db("chickens")
    .where({ id })
    .update(changes);

  return getById(id);
}

function del(id) {
  return db("chickens")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getById,
  create,
  update,
  del
};
