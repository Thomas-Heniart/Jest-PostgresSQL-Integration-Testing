import { Client } from "ts-postgres";
import { ExampleRepository } from "../../exampleRepository";
import { config } from "dotenv";
import { connectToTestDatabase, dropTestDatabase } from "../postgreUtils";

describe("Select Test Suite", () => {
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

  it("selects nothing", async () => {
    expect(await repository.findAll()).toEqual([]);
  });
});
