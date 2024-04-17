exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 8).notNullable();

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("update_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("users");