import { Client } from "ts-postgres";
import { ExampleRepository } from "../../exampleRepository";
import { config } from "dotenv";
import { rootConnect } from "../postgreUtils";

describe("Select Test Suite", () => {
  let client: Client;
  let repository: ExampleRepository;

  beforeAll(async () => {
    config();
    client = await rootConnect();
  });

  afterAll(async () => {
    await client.end();
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
