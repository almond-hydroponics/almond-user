import * as dotenv from "dotenv";

dotenv.config();

interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: boolean | Function;
  force: boolean;
  timezone: string;
  jwtPrivateKey?: string;
}

interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
}

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: "postgres",
    password: "bhakitamasha",
    database: "almond_users",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    logging: false,
    force: false,
    timezone: "+03:00",
    jwtPrivateKey: process.env.JWTKEY || "",
  },
  production: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "127.0.0.1",
    port: +process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    force: true,
    timezone: "+03:00",
  },
  test: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "127.0.0.1",
    port: +process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: true,
    force: true,
    timezone: "+03:00",
  },
};
