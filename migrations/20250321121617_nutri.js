/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_crn", function (table) {
    table.increments("id").primary();
    table.string("crn").unique();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table
      .enum("typeCRN", ["CRN-1", "CRN-2", "CRN-3", "CRN-4", "CRN-5", "CRN-6", "CRN-7", "CRN-8", "CRN-9", "CRN-10", "CRN-11"], {
        useNative: true,
        enumName: "ENUMTypeCRN",
      })
      .defaultTo("CRN-6")
      .notNullable();
    table.float("price").defaultTo(100);
    table.boolean("open").defaultTo(false);
    table.boolean("accept_auto").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("user_crn");
};
