import { Client, SSLMode } from "ts-postgres";
import { v4 as uuid } from "uuid";
import { readdirSync, readFileSync } from "fs";
import * as child_process from "child_process";

export const connectToTestDatabase = async (
  migrationsFunc: MigrationFunc = runMigrations
) => {
  let client = await rootConnect();
  const database = uuid();
  await client.query(`CREATE DATABASE "${database}"`);
  await client.end();
  client = await connectToDatabase(database);
  await migrationsFunc(client);
  return client;
};

export const dropTestDatabase = async (client: Client) => {
  const database = client.config.database;
  await client.end();
  const rootClient = await rootConnect();
  await rootClient.query(`DROP DATABASE "${database}"`);
  await rootClient.end();
};

export const rootConnect = async () => connectToDatabase(process.env.DB_NAME);

const connectToDatabase = async (database: string) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database,
    ssl: SSLMode.Disable,
  });

  await client.connect();
  return client;
};

const migrationsPath = `${__dirname}/../../sql`;

const runMigrations = async (client: Client) => {
  for (const filePath of readdirSync(migrationsPath))
    await runMigration(client, `${migrationsPath}/${filePath}`);
};

export const runMigrationsInShell: MigrationFunc = async (client: Client) => {
  for (const filePath of readdirSync(migrationsPath))
    child_process.execSync(
      `PGPASSWORD="${client.config.password}" psql -h ${client.config.host} -p ${client.config.port} -U ${client.config.user} -d ${client.config.database} -a -f ${migrationsPath}/${filePath}`
    );
};

type MigrationFunc = typeof runMigrations;

const runMigration = async (client: Client, filePath) => {
  for (const query of queriesInMigrationFile(filePath))
    await client.query(query);
};

/**
 * :warning: - Fails if a query inserts data containing ";" character
 * @param filePath
 */
const queriesInMigrationFile = (filePath: string) =>
  readFileSync(filePath).toString().split(";");
