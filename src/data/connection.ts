import knex, { Knex } from "knex";

class DatabaseConnection {
  private static instance: Knex | null = null;

  private constructor() {}

  public static getInstance(): Knex {
    if (!this.instance) {
      this.instance = knex({
        client: "postgresql",
        connection: {
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          user: process.env.DB_USER,
          password: process.env.DB_PWD,
          //ssl: { rejectUnauthorized: false },
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
