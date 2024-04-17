exports.up = (knex) => knex.schema.createTable("movie_notes", (table) => {
  table.increments("id");
  table.string("title", 255).notNullable();
  table.string("description", 255).notNullable();
  table.integer("rating").notNullable();
  table.integer("user_id").references("id").inTable("users");

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable("movie_notes");
