/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary(); // ID autoincrementado
    table.string("name", 255).notNullable(); // Nome do usuário
    table.string("username", 15).notNullable().unique(); // Nome de usuario
    table.string("email", 255).notNullable().unique(); // Email único
    table.string("password", 255).notNullable(); // Senha
    table.string("bio"); // Bio usuario
    table.text("picture"); // Foto usuario
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Data de criação
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Data de atualização
    table
      .enum("whosendmessage", ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "onlyI"], {
        useNative: true,
        enumName: "ENUMseeMyMessage",
      })
      .defaultTo("*")
      .notNullable();
    table
      .enum("whoseemyposts", ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "onlyI"], {
        useNative: true,
        enumName: "ENUMwhoSeeMyPosts",
      })
      .defaultTo("*")
      .notNullable();
    table
      .enum("whoseemyplanning", ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "onlyI"], {
        useNative: true,
        enumName: "ENUMwhoSeeMyPlanning",
      })
      .defaultTo("*")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users"); // Remove a tabela "users"
};
