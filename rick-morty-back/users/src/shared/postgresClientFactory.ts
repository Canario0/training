import { DataSource, DataSourceOptions } from "typeorm";

export default class PostgresClientFactory {
	private static client: DataSource;

	public static async createClient(
		config: DataSourceOptions
	): Promise<DataSource> {
		let client = PostgresClientFactory.getClient();
		if (!client) {
			client = await PostgresClientFactory.createAndConnectClient(config);
			PostgresClientFactory.client = client;
		}
		return client;
	}

	private static getClient(): DataSource | undefined {
		return PostgresClientFactory.client;
	}

	private static async createAndConnectClient(
		config: DataSourceOptions
	): Promise<DataSource> {
		const client = new DataSource(config);
		await client.initialize();
		return client;
	}
}
