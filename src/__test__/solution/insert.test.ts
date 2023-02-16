import { Client } from "ts-postgres";
import { ExampleRepository } from "../../exampleRepository";
import { config } from "dotenv";
import { v4 } from "uuid";
import { connectToTestDatabase, dropTestDatabase } from "../postgreUtils";

describe("Insert Test Suite", () => {
  let client: Client;
  let repository: ExampleRepository;

  beforeAll(async () => {
    config();
    client = await connectToTestDatabase();
  });

  afterAll(async () => {
    await dropTestDatabase(client);
  });

  beforeEach(() => {
    repository = new ExampleRepository(client);
  });

  afterEach(async () => {
    await client.query("DELETE FROM example");
  });

  it("inserts and select", async () => {
    const id = v4();
    await repository.insert(id);
    expect(await repository.findAll()).toEqual([[id]]);
  });
});
