const db = require("../data/config");

async function create(chicken) {
  const [id] = await db("chickens").insert(chicken);

  return db("chickens")
    .where({ id })
    .first();
}

function del(id) {
  return db("chickens")
    .where({ id })
    .del();
}

module.exports = {
  create,
  del
};
