import { Client, Value } from "ts-postgres";

export class ExampleRepository {
  private readonly _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async findAll(): Promise<Array<Value>> {
    return (await this._client.query("SELECT * FROM example")).rows;
  }

  async insert(id: string): Promise<void> {
    await this._client.query("INSERT INTO example (id) VALUES ($1)", [id]);
  }
}
