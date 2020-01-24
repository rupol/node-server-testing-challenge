exports.up = async knex => {
  await knex.schema.createTable("chickens", table => {
    table.increments();
    table.string("name", 255).notNullable();
    table.string("breed", 255).notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("chickens");
};
