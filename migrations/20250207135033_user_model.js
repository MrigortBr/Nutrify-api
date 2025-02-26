/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary(); // ID autoincrementado
    table.string("name", 255).notNullable(); // Nome do usuário
    table.string("email", 255).notNullable().unique(); // Email único
    table.string("password", 255).notNullable(); // Senha
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Data de criação
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Data de atualização
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
