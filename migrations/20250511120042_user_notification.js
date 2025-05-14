/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_notification", (table) => {
    table.increments("id").primary();
    table.integer("user_one").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("user").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("message").notNullable();
    table.string("link").nullable();
    table
      .enum("type", ["chat", "post", "profile"], {
        useNative: true,
        enumName: "ENUMNotification",
      })
      .defaultTo("post")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("read").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("user_notification");
};
