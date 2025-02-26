import knex, { Knex } from "knex";

class DatabaseConnection {
  private static instance: Knex | null = null;

  private constructor() {}

  public static getInstance(): Knex {
    if (!this.instance) {
      this.instance = knex({
        client: "postgresql",
        connection: {
          host: "dpg-cuj03prqf0us73dvcep0-a.oregon-postgres.render.com",
          database: "server_test_render",
          user: "server_test_render_user",
          password: "iLDCVMd1i4mIH4yxXbBLZBvF3n3PmkOs",
          ssl: { rejectUnauthorized: false },
        },
        pool: {
          min: 2,
          max: 10,
        },
      });
    }
    return this.instance;
  }
}

export default DatabaseConnection;
