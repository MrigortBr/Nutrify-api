// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "dpg-cuj03prqf0us73dvcep0-a.oregon-postgres.render.com",
      database: "server_test_render",
      user: "server_test_render_user",
      password: "iLDCVMd1i4mIH4yxXbBLZBvF3n3PmkOs",
      ssl: { rejectUnauthorized: true },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
