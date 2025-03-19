/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_message_user", (table) => {
    table.increments("id").primary();
    table.integer("user_id_one").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("user_id_two").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("message").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("identifier_chat").notNullable();
    table.boolean("read").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("user_chat_user");
};
