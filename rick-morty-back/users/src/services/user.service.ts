import { Context, Service, ServiceBroker } from "moleculer";
import { DataSource } from "typeorm";
import users from "../data/users.demo";
import container from "../dependency-injection";
import { TypeUser } from "../entities/user.entity";

export default class ProductsService extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		const usersGetAllController = container.get(
			"App.controller.UsersGetAllController"
		);
		const usersGetDetailsController = container.get(
			"App.controller.UsersGetDetailsController"
		);
		this.parseServiceSchema({
			name: "users",
			version: 1,
			settings: {},
			hooks: {},
			actions: {
				getAll: {
					rest: "GET /",
					params: {
						name: { type: "string", optional: true },
					},
					handler: (ctx: Context) => usersGetAllController.run(ctx),
				},
				getDetail: {
					rest: "GET /:id",
					params: {
						id: { type: "string", optional: false },
					},
					handler: (ctx: Context) =>
						usersGetDetailsController.run(ctx),
				},
			},
			methods: {},
			started: this.seedDB,
		});
	}
	private async seedDB() {
		const client = (await container.get(
			"Shared.ConnectionManager"
		)) as DataSource;
		client.getRepository(TypeUser).save(users);
	}
}
