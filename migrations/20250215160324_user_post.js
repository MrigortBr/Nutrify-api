/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("post", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table
      .enum("post_commentable", ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow"], {
        useNative: true,
        enumName: "post_commentable",
      })
      .defaultTo("*")
      .notNullable();
    table
      .enum("visibility", ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow", "draft", "archived"], {
        useNative: true,
        enumName: "post_visibility",
      })
      .defaultTo("*")
      .notNullable();
    table.binary("picture").notNullable();
    table.text("caption").notNullable();
    table.timestamp("posted_at");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.specificType("tags", "text[]");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("post");
};
