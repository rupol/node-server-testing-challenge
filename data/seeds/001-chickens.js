exports.seed = async knex => {
  await knex("chickens").truncate();

  await knex("chickens").insert([
    { name: "carol", breed: "buff orpington" },
    { name: "olivia", breed: "cream brabanter" },
    { name: "rachel", breed: "cream legbar" },
    { name: "tessa", breed: "black australorp" },
    { name: "brienne", breed: "lavender orpington" }
  ]);
};
