/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("post", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table
      .enum("post_commentable", ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow"], {
        useNative: true,
        enumName: "ENUMpostCommentable",
      })
      .defaultTo("*")
      .notNullable();
    table
      .enum("visibility", ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "draft", "archived"], {
        useNative: true,
        enumName: "ENUMpostVisibility",
      })
      .defaultTo("*")
      .notNullable();
    table.text("picture").notNullable();
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
