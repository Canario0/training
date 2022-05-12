import { DataSourceOptions } from "typeorm";

export default class PostgresConfigFactory {
	public static createConfig(): DataSourceOptions {
		return {
			type: "postgres",
			host: "172.18.0.2",
			port: 5432,
			username: "test",
			password: "test",
			database: "characters",
			synchronize: true,
			logging: false,
			entities: ["../**/*.entity.ts"],
			migrations: [],
			subscribers: [],
		};
	}
}
